-- EDPCA Core Tables Migration
-- Cases, Charges, Persons

-- ============================================================
-- ENUMS
-- ============================================================

DROP TYPE IF EXISTS public.case_status CASCADE;
CREATE TYPE public.case_status AS ENUM ('draft', 'review', 'investigation', 'notice', 'charged', 'wanted', 'convicted', 'closed');

DROP TYPE IF EXISTS public.charge_status CASCADE;
CREATE TYPE public.charge_status AS ENUM ('not-issued', 'issued', 'pending', 'paid', 'overdue', 'cancelled');

DROP TYPE IF EXISTS public.notice_status CASCADE;
CREATE TYPE public.notice_status AS ENUM ('unpublished', 'draft', 'published');

DROP TYPE IF EXISTS public.priority_level CASCADE;
CREATE TYPE public.priority_level AS ENUM ('low', 'normal', 'high', 'critical');

DROP TYPE IF EXISTS public.person_status CASCADE;
CREATE TYPE public.person_status AS ENUM ('active', 'closed', 'archived');

DROP TYPE IF EXISTS public.charge_type CASCADE;
CREATE TYPE public.charge_type AS ENUM ('Administrative Fee', 'Court-Ordered Fine', 'Processing Fee');

-- ============================================================
-- TABLES
-- ============================================================

CREATE TABLE IF NOT EXISTS public.cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ref TEXT NOT NULL UNIQUE,
  person TEXT NOT NULL,
  country TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Cannabis Purchase',
  amount TEXT NOT NULL DEFAULT '€0',
  case_status public.case_status NOT NULL DEFAULT 'draft'::public.case_status,
  charge_status public.charge_status NOT NULL DEFAULT 'not-issued'::public.charge_status,
  notice_status public.notice_status NOT NULL DEFAULT 'unpublished'::public.notice_status,
  priority public.priority_level NOT NULL DEFAULT 'normal'::public.priority_level,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.charges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  charge_ref TEXT NOT NULL UNIQUE,
  case_ref TEXT NOT NULL,
  person TEXT NOT NULL,
  charge_type TEXT NOT NULL DEFAULT 'Administrative Fee',
  legal_basis TEXT NOT NULL DEFAULT '',
  amount TEXT NOT NULL,
  currency TEXT NOT NULL DEFAULT 'EUR',
  issue_date DATE NOT NULL,
  due_date DATE NOT NULL,
  status public.charge_status NOT NULL DEFAULT 'pending'::public.charge_status,
  payment_date DATE,
  payment_ref TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.persons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  person_ref TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  country TEXT NOT NULL,
  case_count INTEGER NOT NULL DEFAULT 0,
  latest_case TEXT NOT NULL DEFAULT '',
  status public.person_status NOT NULL DEFAULT 'active'::public.person_status,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_cases_ref ON public.cases(ref);
CREATE INDEX IF NOT EXISTS idx_cases_case_status ON public.cases(case_status);
CREATE INDEX IF NOT EXISTS idx_cases_created_at ON public.cases(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_charges_case_ref ON public.charges(case_ref);
CREATE INDEX IF NOT EXISTS idx_charges_status ON public.charges(status);
CREATE INDEX IF NOT EXISTS idx_persons_person_ref ON public.persons(person_ref);

-- ============================================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================================

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ============================================================
-- ENABLE RLS
-- ============================================================

ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.charges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.persons ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- RLS POLICIES (open access — admin-only app, no public auth)
-- ============================================================

DROP POLICY IF EXISTS "open_access_cases" ON public.cases;
CREATE POLICY "open_access_cases" ON public.cases FOR ALL TO public USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "open_access_charges" ON public.charges;
CREATE POLICY "open_access_charges" ON public.charges FOR ALL TO public USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "open_access_persons" ON public.persons;
CREATE POLICY "open_access_persons" ON public.persons FOR ALL TO public USING (true) WITH CHECK (true);

-- ============================================================
-- TRIGGERS
-- ============================================================

DROP TRIGGER IF EXISTS set_cases_updated_at ON public.cases;
CREATE TRIGGER set_cases_updated_at
  BEFORE UPDATE ON public.cases
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS set_charges_updated_at ON public.charges;
CREATE TRIGGER set_charges_updated_at
  BEFORE UPDATE ON public.charges
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS set_persons_updated_at ON public.persons;
CREATE TRIGGER set_persons_updated_at
  BEFORE UPDATE ON public.persons
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================
-- SEED DATA
-- ============================================================

DO $$
BEGIN
  INSERT INTO public.cases (ref, person, country, category, amount, case_status, charge_status, notice_status, priority, created_at)
  VALUES
    ('DA-2026-001527', 'Marcus Thierry Dubois', 'Belgium', 'Cannabis Purchase', '€850', 'investigation'::public.case_status, 'pending'::public.charge_status, 'published'::public.notice_status, 'high'::public.priority_level, '2026-08-17 00:00:00+00'),
    ('DA-2026-001526', 'Yuki Tanaka', 'Japan', 'High-THC Product', '¥42,000', 'review'::public.case_status, 'not-issued'::public.charge_status, 'draft'::public.notice_status, 'normal'::public.priority_level, '2026-08-17 00:00:00+00'),
    ('DA-2026-001525', 'Omar Ibrahim Al-Rashid', 'UAE', 'Drug Importation', '€1,200', 'charged'::public.case_status, 'issued'::public.charge_status, 'published'::public.notice_status, 'critical'::public.priority_level, '2026-08-16 00:00:00+00'),
    ('DA-2026-001524', 'Ana Beatriz Santos', 'Brazil', 'Online Substance', 'R$3,400', 'notice'::public.case_status, 'paid'::public.charge_status, 'published'::public.notice_status, 'normal'::public.priority_level, '2026-08-15 00:00:00+00'),
    ('DA-2026-001523', 'Luca Bianchi', 'Italy', 'Cannabis Purchase', '€620', 'draft'::public.case_status, 'not-issued'::public.charge_status, 'unpublished'::public.notice_status, 'low'::public.priority_level, '2026-08-15 00:00:00+00'),
    ('DA-2026-001521', 'Fatima Al-Hassan', 'Netherlands', 'Online Substance', '€990', 'review'::public.case_status, 'not-issued'::public.charge_status, 'published'::public.notice_status, 'high'::public.priority_level, '2026-08-14 00:00:00+00'),
    ('DA-2026-001489', 'Aleksander Nowak', 'Poland', 'High-THC Product', '€440', 'notice'::public.case_status, 'pending'::public.charge_status, 'published'::public.notice_status, 'normal'::public.priority_level, '2026-08-14 00:00:00+00'),
    ('DA-2026-001452', 'Valentina Cruz Herrera', 'Spain', 'Drug Importation', '€1,750', 'charged'::public.case_status, 'overdue'::public.charge_status, 'published'::public.notice_status, 'critical'::public.priority_level, '2026-08-11 00:00:00+00'),
    ('DA-2026-001421', 'Tobias Müller', 'Germany', 'Suspected Distribution', '€3,200', 'investigation'::public.case_status, 'issued'::public.charge_status, 'published'::public.notice_status, 'critical'::public.priority_level, '2026-08-08 00:00:00+00'),
    ('DA-2026-001398', 'Dmitri Volkov', 'Czech Republic', 'Cannabis Purchase', '€670', 'notice'::public.case_status, 'paid'::public.charge_status, 'published'::public.notice_status, 'normal'::public.priority_level, '2026-08-04 00:00:00+00'),
    ('DA-2026-001362', 'Isabelle Fontaine', 'France', 'High-THC Product', '€1,100', 'charged'::public.case_status, 'pending'::public.charge_status, 'published'::public.notice_status, 'high'::public.priority_level, '2026-07-29 00:00:00+00'),
    ('DA-2026-001334', 'Sven Eriksson', 'Sweden', 'Drug Trafficking', '€8,500', 'wanted'::public.case_status, 'issued'::public.charge_status, 'published'::public.notice_status, 'critical'::public.priority_level, '2026-07-18 00:00:00+00')
  ON CONFLICT (ref) DO NOTHING;

  INSERT INTO public.charges (charge_ref, case_ref, person, charge_type, legal_basis, amount, currency, issue_date, due_date, status, payment_date, payment_ref)
  VALUES
    ('CH-2026-000187', 'DA-2026-001527', 'J. Morrison', 'Administrative Fee', 'Agency Administrative Order', '1,200', 'EUR', '2026-08-17', '2026-09-17', 'pending'::public.charge_status, NULL, NULL),
    ('CH-2026-000142', 'DA-2026-000891', 'A. Bergmann', 'Court-Ordered Fine', 'Court Order No. 2026/891', '3,500', 'EUR', '2026-07-10', '2026-08-10', 'paid'::public.charge_status, '2026-08-05', 'TXN-88291'),
    ('CH-2026-000098', 'DA-2025-003412', 'M. Dubois', 'Administrative Fee', 'Agency Administrative Order', '850', 'EUR', '2026-06-01', '2026-07-01', 'overdue'::public.charge_status, NULL, NULL),
    ('CH-2026-000201', 'DA-2026-002100', 'R. van der Berg', 'Processing Fee', 'Agency Fee Schedule', '450', 'EUR', '2026-08-15', '2026-09-15', 'pending'::public.charge_status, NULL, NULL),
    ('CH-2025-000876', 'DA-2025-001890', 'S. Kowalski', 'Court-Ordered Fine', 'Court Order No. 2025/1890', '2,100', 'EUR', '2025-11-20', '2025-12-20', 'cancelled'::public.charge_status, NULL, NULL)
  ON CONFLICT (charge_ref) DO NOTHING;

  INSERT INTO public.persons (person_ref, name, email, phone, country, case_count, latest_case, status)
  VALUES
    ('P-001', 'J. Morrison', 'j.morrison@email.com', '+44 7700 900000', 'United Kingdom', 2, 'DA-2026-001527', 'active'::public.person_status),
    ('P-002', 'A. Bergmann', 'a.bergmann@email.de', '+49 151 00000000', 'Germany', 1, 'DA-2026-000891', 'active'::public.person_status),
    ('P-003', 'M. Dubois', 'm.dubois@email.fr', '+33 6 00 00 00 00', 'France', 1, 'DA-2025-003412', 'closed'::public.person_status),
    ('P-004', 'R. van der Berg', 'r.vdberg@email.nl', '+31 6 00000000', 'Netherlands', 3, 'DA-2026-002100', 'active'::public.person_status),
    ('P-005', 'S. Kowalski', 's.kowalski@email.pl', '+48 500 000 000', 'Poland', 1, 'DA-2025-001890', 'archived'::public.person_status)
  ON CONFLICT (person_ref) DO NOTHING;

EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Seed data insertion failed: %', SQLERRM;
END $$;
