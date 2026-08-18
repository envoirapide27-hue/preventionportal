'use client';

import { createClient } from '@/lib/supabase/client';

export interface CaseRow {
  id: string;
  ref: string;
  person: string;
  country: string;
  category: string;
  amount: string;
  caseStatus: string;
  chargeStatus: string;
  noticeStatus: string;
  priority: string;
  created: string;
}

export interface ChargeRow {
  id: string;
  chargeRef: string;
  caseRef: string;
  person: string;
  chargeType: string;
  legalBasis: string;
  amount: string;
  currency: string;
  issueDate: string;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  paymentDate?: string;
  paymentRef?: string;
}

export interface PersonRow {
  id: string;
  personRef: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  caseCount: number;
  latestCase: string;
  status: 'active' | 'closed' | 'archived';
}

function isSchemaError(error: { code?: string; message?: string }): boolean {
  if (!error) return false;
  if (error.code && typeof error.code === 'string') {
    const cls = error.code.substring(0, 2);
    if (cls === '42' || cls === '08') return true;
    if (cls === '23') return false;
  }
  if (error.message) {
    const patterns = [
      /relation.*does not exist/i,
      /column.*does not exist/i,
      /function.*does not exist/i,
      /syntax error/i,
      /type.*does not exist/i,
    ];
    return patterns.some((p) => p.test(error.message!));
  }
  return false;
}

// ─── CASES ────────────────────────────────────────────────────────────────────

function dbToCase(row: Record<string, unknown>): CaseRow {
  const d = new Date(row.created_at as string);
  const created = `${d.getDate()} ${d.toLocaleString('en-GB', { month: 'short' })} ${d.getFullYear()}`;
  return {
    id: row.id as string,
    ref: row.ref as string,
    person: row.person as string,
    country: row.country as string,
    category: row.category as string,
    amount: row.amount as string,
    caseStatus: row.case_status as string,
    chargeStatus: row.charge_status as string,
    noticeStatus: row.notice_status as string,
    priority: row.priority as string,
    created,
  };
}

export const caseService = {
  async getAll(): Promise<CaseRow[]> {
    const supabase = createClient();
    try {
      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        if (isSchemaError(error)) throw error;
        return [];
      }
      return (data || []).map(dbToCase);
    } catch (err: unknown) {
      console.error('caseService.getAll error:', err);
      throw err;
    }
  },

  async create(input: {
    person: string;
    country: string;
    category: string;
    amount: string;
    priority: string;
  }): Promise<CaseRow> {
    const supabase = createClient();
    const year = new Date().getFullYear();
    const seq = String(Math.floor(Math.random() * 900000) + 100000).slice(0, 6);
    const ref = `DA-${year}-${seq}`;
    try {
      const { data, error } = await supabase
        .from('cases')
        .insert({
          ref,
          person: input.person,
          country: input.country,
          category: input.category,
          amount: input.amount,
          case_status: 'draft',
          charge_status: 'not-issued',
          notice_status: 'unpublished',
          priority: input.priority,
        })
        .select()
        .single();
      if (error) {
        if (isSchemaError(error)) throw error;
        throw new Error(error.message);
      }
      return dbToCase(data as Record<string, unknown>);
    } catch (err: unknown) {
      console.error('caseService.create error:', err);
      throw err;
    }
  },
};

// ─── CHARGES ──────────────────────────────────────────────────────────────────

function dbToCharge(row: Record<string, unknown>): ChargeRow {
  return {
    id: row.id as string,
    chargeRef: row.charge_ref as string,
    caseRef: row.case_ref as string,
    person: row.person as string,
    chargeType: row.charge_type as string,
    legalBasis: row.legal_basis as string,
    amount: row.amount as string,
    currency: row.currency as string,
    issueDate: row.issue_date as string,
    dueDate: row.due_date as string,
    status: row.status as ChargeRow['status'],
    paymentDate: row.payment_date as string | undefined,
    paymentRef: row.payment_ref as string | undefined,
  };
}

export const chargeService = {
  async getAll(): Promise<ChargeRow[]> {
    const supabase = createClient();
    try {
      const { data, error } = await supabase
        .from('charges')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        if (isSchemaError(error)) throw error;
        return [];
      }
      return (data || []).map(dbToCharge);
    } catch (err: unknown) {
      console.error('chargeService.getAll error:', err);
      throw err;
    }
  },

  async create(input: {
    caseRef: string;
    person: string;
    chargeType: string;
    legalBasis: string;
    amount: string;
    currency: string;
    issueDate: string;
    dueDate: string;
  }): Promise<ChargeRow> {
    const supabase = createClient();
    const year = new Date().getFullYear();
    const seq = String(Math.floor(Math.random() * 900000) + 100000).slice(0, 6);
    const chargeRef = `CH-${year}-${seq}`;
    try {
      const { data, error } = await supabase
        .from('charges')
        .insert({
          charge_ref: chargeRef,
          case_ref: input.caseRef,
          person: input.person,
          charge_type: input.chargeType,
          legal_basis: input.legalBasis || '',
          amount: input.amount,
          currency: input.currency,
          issue_date: input.issueDate,
          due_date: input.dueDate,
          status: 'pending',
        })
        .select()
        .single();
      if (error) {
        if (isSchemaError(error)) throw error;
        throw new Error(error.message);
      }
      return dbToCharge(data as Record<string, unknown>);
    } catch (err: unknown) {
      console.error('chargeService.create error:', err);
      throw err;
    }
  },

  async markPaid(id: string): Promise<void> {
    const supabase = createClient();
    const today = new Date().toISOString().split('T')[0];
    const { error } = await supabase
      .from('charges')
      .update({ status: 'paid', payment_date: today })
      .eq('id', id);
    if (error && isSchemaError(error)) throw error;
  },
};

// ─── PERSONS ──────────────────────────────────────────────────────────────────

function dbToPerson(row: Record<string, unknown>): PersonRow {
  return {
    id: row.id as string,
    personRef: row.person_ref as string,
    name: row.name as string,
    email: row.email as string,
    phone: row.phone as string,
    country: row.country as string,
    caseCount: row.case_count as number,
    latestCase: row.latest_case as string,
    status: row.status as PersonRow['status'],
  };
}

export const personService = {
  async getAll(): Promise<PersonRow[]> {
    const supabase = createClient();
    try {
      const { data, error } = await supabase
        .from('persons')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        if (isSchemaError(error)) throw error;
        return [];
      }
      return (data || []).map(dbToPerson);
    } catch (err: unknown) {
      console.error('personService.getAll error:', err);
      throw err;
    }
  },
};
