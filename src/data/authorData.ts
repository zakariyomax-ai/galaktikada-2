export interface EducationStage {
  period: string;
  institution: string;
  description: string;
}

export interface CareerMilestone {
  years: string;
  organization: string;
  role: string;
  details: string;
}

export interface AuthorProfile {
  name: string;
  birthDate: string;
  birthPlace: string;
  portraitPrimary: string;
  portraitSecondary: string;
  portraitWithBook: string;
  bioSummary: string;
  educationStages: EducationStage[];
  careerMilestones: CareerMilestone[];
  presentationNote: string;
}

export const authorData: AuthorProfile = {
  name: "Saʼdullo Quronov",
  birthDate: "1989-yil 31-yanvar",
  birthPlace: "Andijon tumani",
  portraitPrimary: "/assets/aistudio/image_3bd03d7a.png",
  portraitSecondary: "/assets/aistudio/image_846a07d8.png",
  portraitWithBook: "/assets/aistudio/image_031920e5.png",
  bioSummary: `Saʼdullo Quronov 1989-yil 31-yanvarda Andijon tumanida tugʻilgan. 4-umumtaʼlim maktabida, 2004 – 2006-yillarda ADU qoshidagi 11-litsey-internatda oʻqigan. 2006 – 2007-yillarda Andijon davlat universiteti, 2007 – 2012-yillar davomida Oʻzbekiston Milliy universiteti filologiya fakultetining bakalavr, magistratura bosqichlarini tamomlagan. Mehnat faoliyatini 2011-yilda “Sharq yulduzi” jurnalida boshlab, masʼul kotib, adabiyotshunoslik boʻlimi muharriri lavozimlarida ishlagan. 2015-yildan boshlab “Jajji akademik” bolalar jurnalida muharrir, keyinroq bosh muharrir lavozimlarida ishlagan.`,
  
  educationStages: [
    {
      period: "Boshlangʻich va oʻrta taʼlim",
      institution: "Andijon tumani 4-umumtaʼlim maktabi",
      description: "Ilk maktab taʼlimini tugʻilib oʻsgan Andijon tumanidagi 4-umumtaʼlim maktabida olgan."
    },
    {
      period: "2004–2006",
      institution: "ADU qoshidagi 11-litsey-internat",
      description: "Andijon davlat universiteti qoshidagi ixtisoslashtirilgan 11-litsey-internatda tahsil olgan."
    },
    {
      period: "2006–2007",
      institution: "Andijon davlat universiteti (ADU)",
      description: "Oliy taʼlimning dastlabki bosqichini Andijon davlat universitetida boshlagan."
    },
    {
      period: "2007–2012",
      institution: "Oʻzbekiston Milliy universiteti (OʻzMU)",
      description: "Oʻzbekiston Milliy universiteti filologiya fakultetining bakalavriat hamda magistratura bosqichlarini muvaffaqiyatli tamomlagan."
    }
  ],

  careerMilestones: [
    {
      years: "2011–2015",
      organization: "„Sharq yulduzi“ adabiy jurnali",
      role: "Masʼul kotib, adabiyotshunoslik boʻlimi muharriri",
      details: "Mehnat faoliyatini nufuzli adabiy nashrda boshlab, masʼul kotib va adabiyotshunoslik boʻlimi muharriri lavozimlarida ishladi."
    },
    {
      years: "2015–2018",
      organization: "„Jajji akademik“ ilmiy-ommabop bolalar jurnali",
      role: "Asoschilardan biri, muharrir va bosh muharrir",
      details: "Yosh avlod uchun moʻljallangan mashhur ilmiy-ommabop bolalar jurnalining asoschilaridan biri hamda bosh muharriri boʻldi."
    },
    {
      years: "2018–2020",
      organization: "„Yoshlik“ jurnali",
      role: "Tahririyat aʼzosi",
      details: "Yosh ijodkorlar va zamonaviy oʻzbek adabiyoti jarayonlarida faol ishtirok etib, „Yoshlik“ jurnalida faoliyat olib bordi."
    },
    {
      years: "2020–2022",
      organization: "Respublika taʼlim markazi",
      role: "Metodist va yangi avlod darsliklari hammuallifi",
      details: "Milliy taʼlim tizimida katta burilish yasagan yangi avlod darsliklarini yaratish va taʼlim metodikasini takomillashtirish ustida ishladi."
    },
    {
      years: "2024 – hozirgacha",
      organization: "„Mutolaa“ loyihasi",
      role: "Loyiha aʼzosi va targʻibotchi",
      details: "„Mutolaa“ loyihasida faoliyat yuritib, Oʻzbekiston yoshlari oʻrtasida zamonaviy va tizimli kitobxonlikni keng targʻib qilmoqda."
    }
  ],

  presentationNote: `Saʼdullo Quronov 1989-yil 31-yanvarda Andijon tumanida tugʻilgan. 4-umumtaʼlim maktabida, 2004 – 2006-yillarda ADU qoshidagi 11-litsey-internatda oʻqigan. 2006 – 2007-yillarda Andijon davlat universiteti, 2007 – 2012-yillar davomida Oʻzbekiston Milliy universiteti filologiya fakultetining bakalavr, magistratura bosqichlarini tamomlagan. Mehnat faoliyatini 2011-yilda “Sharq yulduzi” jurnalida boshlab, masʼul kotib, adabiyotshunoslik boʻlimi muharriri lavozimlarida ishlagan. 2015-yildan boshlab “Jajji akademik” bolalar jurnalida muharrir, keyinroq bosh muharrir lavozimlarida ishlagan.`
};
