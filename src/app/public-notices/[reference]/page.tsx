import React from 'react';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';
import StatusBadge from '@/components/ui/StatusBadge';

interface PublicNoticeData {
  reference: string;
  status: 'active' | 'investigation' | 'charged' | 'convicted' | 'closed' | 'notice' | 'review' | 'wanted';
  publicationDate: string;
  issueDate: string;
  noticeType: string;
  person: {
    name: string;
    country: string;
    city: string;
    caseCategory: string;
  };
  purchase: {
    productName: string;
    productCategory: string;
    quantity: string;
    purchaseDate: string;
    purchaseAmount: string;
    currency: string;
    purchaseSource: string;
    paymentMethod: string;
  };
  allegation: {
    type: string;
    description: string;
    legalStatus: string;
  };
  applicableLaw: {
    jurisdiction: string;
    offence: string;
    legalReference: string;
    potentialConsequences: string;
    source: string;
  };
}

const mockNotices: Record<string, PublicNoticeData> = {
  'DA-2026-001527': {
    reference: 'DA-2026-001527',
    status: 'investigation',
    publicationDate: '17 August 2026',
    issueDate: '17 August 2026',
    noticeType: 'Case Notification',
    person: { name: 'Marcus Thierry Dubois', country: 'Belgium', city: 'Brussels', caseCategory: 'Cannabis Purchase' },
    purchase: { productName: 'High-THC Cannabis Products', productCategory: 'Cannabis', quantity: 'Undisclosed', purchaseDate: 'August 2026', purchaseAmount: 'Undisclosed', currency: 'EUR', purchaseSource: 'Encrypted Messaging Platform', paymentMethod: 'Cryptocurrency' },
    allegation: { type: 'Alleged Purchase', description: 'Subject of a public notice relating to alleged online purchase of high-THC cannabis products via an encrypted messaging platform. Delivery intercepted by customs authorities.', legalStatus: 'Under Investigation' },
    applicableLaw: { jurisdiction: 'Belgium', offence: 'Possession and Import of Controlled Substances', legalReference: 'Belgian Drug Law (Wet van 24 februari 1921)', potentialConsequences: 'Up to 5 years imprisonment and/or fine', source: 'Belgian Federal Government' },
  },
  'DA-2026-001489': {
    reference: 'DA-2026-001489',
    status: 'notice',
    publicationDate: '14 August 2026',
    issueDate: '14 August 2026',
    noticeType: 'Case Notification',
    person: { name: 'Aleksander Nowak', country: 'Poland', city: 'Warsaw', caseCategory: 'High-THC Product Purchase' },
    purchase: { productName: 'Concentrated THC Vape Products', productCategory: 'Cannabis', quantity: 'Multiple units', purchaseDate: 'August 2026', purchaseAmount: 'Undisclosed', currency: 'PLN', purchaseSource: 'Online Marketplace', paymentMethod: 'Bank Transfer' },
    allegation: { type: 'Alleged Purchase', description: 'Alleged purchase of concentrated THC vape products via an online marketplace. Purchase records and payment transactions identified.', legalStatus: 'Notice Issued' },
    applicableLaw: { jurisdiction: 'Poland', offence: 'Possession of Narcotic Drugs', legalReference: 'Act on Counteracting Drug Addiction (2005)', potentialConsequences: 'Up to 3 years imprisonment', source: 'Polish Ministry of Justice' },
  },
  'DA-2026-001452': {
    reference: 'DA-2026-001452',
    status: 'charged',
    publicationDate: '11 August 2026',
    issueDate: '11 August 2026',
    noticeType: 'Charge Notification',
    person: { name: 'Valentina Cruz Herrera', country: 'Spain', city: 'Barcelona', caseCategory: 'Drug Importation' },
    purchase: { productName: 'Cannabis Resin', productCategory: 'Cannabis', quantity: 'Undisclosed', purchaseDate: 'July 2026', purchaseAmount: 'Undisclosed', currency: 'EUR', purchaseSource: 'International Postal Services', paymentMethod: 'Undisclosed' },
    allegation: { type: 'Alleged Importation', description: 'Charged in connection with alleged importation of controlled cannabis resin via international postal services. Case referred to national prosecution authorities.', legalStatus: 'Charged' },
    applicableLaw: { jurisdiction: 'Spain', offence: 'Drug Trafficking and Importation', legalReference: 'Spanish Penal Code, Art. 368–370', potentialConsequences: 'Up to 9 years imprisonment', source: 'Spanish Ministry of Justice' },
  },
  'DA-2026-001421': {
    reference: 'DA-2026-001421',
    status: 'investigation',
    publicationDate: '08 August 2026',
    issueDate: '08 August 2026',
    noticeType: 'Case Notification',
    person: { name: 'Tobias Müller', country: 'Germany', city: 'Hamburg', caseCategory: 'Suspected Distribution' },
    purchase: { productName: 'Controlled Substances', productCategory: 'Multiple', quantity: 'Under Review', purchaseDate: 'July–August 2026', purchaseAmount: 'Under Review', currency: 'EUR', purchaseSource: 'Online Channels', paymentMethod: 'Undisclosed' },
    allegation: { type: 'Alleged Distribution', description: 'Under investigation for alleged supply and distribution of controlled substances. Online transaction records and delivery evidence under review.', legalStatus: 'Under Investigation' },
    applicableLaw: { jurisdiction: 'Germany', offence: 'Trafficking in Narcotics', legalReference: 'Narcotics Act (BtMG) §29a', potentialConsequences: 'Up to 15 years imprisonment', source: 'German Federal Ministry of Justice' },
  },
  'DA-2026-001398': {
    reference: 'DA-2026-001398',
    status: 'review',
    publicationDate: '04 August 2026',
    issueDate: '04 August 2026',
    noticeType: 'Awareness Notice',
    person: { name: 'Fatima Al-Hassan', country: 'Netherlands', city: 'Amsterdam', caseCategory: 'Online Controlled Substance Purchase' },
    purchase: { productName: 'Controlled Substances', productCategory: 'Multiple', quantity: 'Undisclosed', purchaseDate: 'July 2026', purchaseAmount: 'Undisclosed', currency: 'EUR', purchaseSource: 'Darknet Marketplace', paymentMethod: 'Cryptocurrency' },
    allegation: { type: 'Alleged Purchase', description: 'Subject of a public awareness notice in connection with alleged purchase of controlled substances through an online darknet marketplace.', legalStatus: 'Under Review' },
    applicableLaw: { jurisdiction: 'Netherlands', offence: 'Possession of Hard Drugs', legalReference: 'Opium Act (Opiumwet), Art. 2', potentialConsequences: 'Up to 12 years imprisonment', source: 'Dutch Ministry of Justice' },
  },
  'DA-2026-001362': {
    reference: 'DA-2026-001362',
    status: 'notice',
    publicationDate: '29 July 2026',
    issueDate: '29 July 2026',
    noticeType: 'Case Notification',
    person: { name: 'Dmitri Volkov', country: 'Czech Republic', city: 'Prague', caseCategory: 'Cannabis Purchase' },
    purchase: { productName: 'Cannabis Products', productCategory: 'Cannabis', quantity: 'Multiple purchases', purchaseDate: 'June–July 2026', purchaseAmount: 'Undisclosed', currency: 'CZK', purchaseSource: 'Social Media Channels', paymentMethod: 'Undisclosed' },
    allegation: { type: 'Alleged Purchase', description: 'Public notice issued regarding alleged purchase of cannabis products via social media channels. Multiple purchases recorded over a four-week period.', legalStatus: 'Notice Issued' },
    applicableLaw: { jurisdiction: 'Czech Republic', offence: 'Possession of Narcotic and Psychotropic Substances', legalReference: 'Act No. 40/2009 Coll. (Criminal Code), §284', potentialConsequences: 'Up to 1 year imprisonment', source: 'Czech Ministry of Justice' },
  },
  'DA-2026-001334': {
    reference: 'DA-2026-001334',
    status: 'charged',
    publicationDate: '22 July 2026',
    issueDate: '22 July 2026',
    noticeType: 'Charge Notification',
    person: { name: 'Isabelle Fontaine', country: 'France', city: 'Lyon', caseCategory: 'High-THC Product Purchase' },
    purchase: { productName: 'High-THC Cannabis Concentrates', productCategory: 'Cannabis', quantity: 'Undisclosed', purchaseDate: 'June 2026', purchaseAmount: 'Undisclosed', currency: 'EUR', purchaseSource: 'Online Platform', paymentMethod: 'Undisclosed' },
    allegation: { type: 'Alleged Possession & Importation', description: 'Charged with alleged possession and importation of high-THC cannabis concentrates. Case currently before the competent judicial authority.', legalStatus: 'Charged' },
    applicableLaw: { jurisdiction: 'France', offence: 'Illegal Use and Possession of Narcotics', legalReference: 'French Public Health Code, Art. L3421-1', potentialConsequences: 'Up to 1 year imprisonment and €3,750 fine', source: 'Légifrance' },
  },
  'DA-2026-001312': {
    reference: 'DA-2026-001312',
    status: 'wanted',
    publicationDate: '18 July 2026',
    issueDate: '18 July 2026',
    noticeType: 'Wanted Notice',
    person: { name: 'Sven Eriksson', country: 'Sweden', city: 'Stockholm', caseCategory: 'Drug Trafficking' },
    purchase: { productName: 'Controlled Substances', productCategory: 'Multiple', quantity: 'Large quantities', purchaseDate: 'Multiple dates', purchaseAmount: 'Undisclosed', currency: 'SEK', purchaseSource: 'Multiple Jurisdictions', paymentMethod: 'Undisclosed' },
    allegation: { type: 'Alleged Trafficking', description: 'Subject of an active public notice in connection with alleged trafficking of controlled substances across multiple European jurisdictions.', legalStatus: 'Wanted' },
    applicableLaw: { jurisdiction: 'Sweden', offence: 'Aggravated Drug Offence', legalReference: 'Narcotics Penalties Act (1968:64), §3', potentialConsequences: 'Up to 10 years imprisonment', source: 'Swedish Ministry of Justice' },
  },
};

export default async function PublicNoticePage({ params }: { params: Promise<{ reference: string }> }) {
  const { reference } = await params;
  const notice = mockNotices[reference?.toUpperCase()];

  if (!notice) {
    return (
      <div className="min-h-screen flex flex-col">
        <PublicHeader />
        <main className="flex-1 flex items-center justify-center py-20 px-4">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="DocumentMagnifyingGlassIcon" size={28} className="text-gray-400" />
            </div>
            <h1 className="text-xl font-bold text-primary mb-2">Notice Not Found</h1>
            <p className="text-gray-600 text-sm mb-6">The notice reference <span className="font-mono font-semibold">{reference}</span> could not be found or is not publicly available.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/verify" className="bg-primary text-white font-medium px-5 py-2.5 rounded-lg text-sm hover:bg-primary/90 transition-colors">
                Verify a Notice
              </Link>
              <Link href="/public-notices-page" className="border border-gray-300 text-gray-700 font-medium px-5 py-2.5 rounded-lg text-sm hover:border-gray-400 transition-colors">
                All Public Notices
              </Link>
            </div>
          </div>
        </main>
        <PublicFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-1 bg-gray-50">
        {/* Official Header */}
        <section className="bg-primary text-white py-10 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-accent text-xs font-bold uppercase tracking-widest mb-3">Official Public Notice</p>
            <h1 className="text-2xl md:text-3xl font-bold mb-3">Case Reference: {notice.reference}</h1>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <StatusBadge variant={notice.status as any} />
              <span className="text-white/60 text-sm">Published: {notice.publicationDate}</span>
            </div>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
          {/* Back link */}
          <Link href="/public-notices-page" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors">
            <Icon name="ArrowLeftIcon" size={14} />
            Back to All Public Notices
          </Link>

          {/* Person Section */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
              <h2 className="font-bold text-primary text-sm uppercase tracking-wider">Person</h2>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="UserIcon" size={28} className="text-gray-400" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4 flex-1">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Name</p>
                    <p className="font-semibold text-primary">{notice.person.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Country</p>
                    <p className="font-medium text-gray-800">{notice.person.country}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">City</p>
                    <p className="font-medium text-gray-800">{notice.person.city}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Case Category</p>
                    <p className="font-medium text-gray-800">{notice.person.caseCategory}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Purchase Information */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
              <h2 className="font-bold text-primary text-sm uppercase tracking-wider">Purchase Information</h2>
            </div>
            <div className="p-6">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Product</p>
                  <p className="font-medium text-gray-800">{notice.purchase.productName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Category</p>
                  <p className="font-medium text-gray-800">{notice.purchase.productCategory}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Quantity</p>
                  <p className="font-medium text-gray-800">{notice.purchase.quantity}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Purchase Date</p>
                  <p className="font-medium text-gray-800">{notice.purchase.purchaseDate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Purchase Amount</p>
                  <p className="font-semibold text-primary">{notice.purchase.currency} {notice.purchase.purchaseAmount}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Purchase Source</p>
                  <p className="font-medium text-gray-800">{notice.purchase.purchaseSource}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Payment Method</p>
                  <p className="font-medium text-gray-800">{notice.purchase.paymentMethod}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Alleged Activity */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
              <h2 className="font-bold text-primary text-sm uppercase tracking-wider">Alleged Activity</h2>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-full">{notice.allegation.type}</span>
                <span className="text-xs font-semibold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">{notice.allegation.legalStatus}</span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{notice.allegation.description}</p>
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-amber-800 text-xs leading-relaxed">
                  <strong>Note:</strong> This notice describes alleged activity. Publication of this notice does not constitute a finding of guilt. Formal determinations are made through the applicable legal process.
                </p>
              </div>
            </div>
          </div>

          {/* Applicable Law */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
              <h2 className="font-bold text-primary text-sm uppercase tracking-wider">Applicable Law</h2>
            </div>
            <div className="p-6">
              <div className="grid sm:grid-cols-2 gap-5 mb-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Jurisdiction</p>
                  <p className="font-medium text-gray-800">{notice.applicableLaw.jurisdiction}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Offence</p>
                  <p className="font-medium text-gray-800">{notice.applicableLaw.offence}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Legal Reference</p>
                  <p className="font-mono text-sm text-primary">{notice.applicableLaw.legalReference}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Potential Consequences</p>
                  <p className="font-medium text-accent text-sm">{notice.applicableLaw.potentialConsequences}</p>
                </div>
              </div>
              <p className="text-gray-500 text-xs italic">Legal consequences depend on the facts of each case and the applicable jurisdiction.</p>
            </div>
          </div>

          {/* Notice Information */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
              <h2 className="font-bold text-primary text-sm uppercase tracking-wider">Notice Information</h2>
            </div>
            <div className="p-6">
              <div className="grid sm:grid-cols-3 gap-5 mb-6">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Case Reference</p>
                  <p className="font-mono font-semibold text-primary">{notice.reference}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Issue Date</p>
                  <p className="font-medium text-gray-800">{notice.issueDate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Notice Type</p>
                  <p className="font-medium text-gray-800">{notice.noticeType}</p>
                </div>
              </div>
              <Link
                href={`/verify?ref=${notice.reference}`}
                className="inline-flex items-center gap-2 border border-primary text-primary hover:bg-primary hover:text-white font-medium px-5 py-2.5 rounded-lg transition-colors text-sm"
              >
                <Icon name="ShieldCheckIcon" size={16} />
                Verify This Notice
              </Link>
            </div>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
