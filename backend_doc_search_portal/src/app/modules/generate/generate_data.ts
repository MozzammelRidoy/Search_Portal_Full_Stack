import { TLegalDoc } from './generate_interface'

export const LEGAL_DOCS: TLegalDoc[] = [
  {
    id: 1,
    title: 'Contract Law - Breach of Agreement',
    keywords: ['contract', 'breach', 'agreement', 'damages', 'obligation'],
    content:
      'A breach of contract occurs when one party fails to fulfill their obligations under a legally binding agreement. Remedies include damages, specific performance, or contract rescission. The injured party must prove the existence of a valid contract, breach, and resulting damages.'
  },
  {
    id: 2,
    title: 'Property Law - Ownership & Transfer',
    keywords: ['property', 'ownership', 'transfer', 'deed', 'title', 'land'],
    content:
      'Property ownership involves legal rights to possess, use, and transfer assets. Transfer of property requires a valid deed, consideration, and registration with relevant authorities. Disputes may arise over boundary lines, easements, or title defects.'
  },
  {
    id: 3,
    title: 'Criminal Law - Offences & Penalties',
    keywords: [
      'criminal',
      'offence',
      'penalty',
      'felony',
      'crime',
      'punishment'
    ],
    content:
      'Criminal law defines offences against the state or society and prescribes penalties. Key principles include presumption of innocence, burden of proof beyond reasonable doubt, and right to legal counsel. Offences are categorized as felonies or misdemeanors based on severity.'
  }
]
