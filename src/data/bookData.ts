export interface Character {
  name: string;
  role: string;
  badge: string;
  description: string;
  avatar?: string;
  traits?: string[];
}

export interface TeamPlan {
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export interface Destination {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
}

export interface ScienceConcept {
  title: string;
  shortDesc: string;
  bookContext: string;
}

export interface BookOverviewData {
  title: string;
  part: string;
  tagline: string;
  genre: string;
  coverImage: string;
  spaceshipImage: string;
  bannerImage: string;
  ahmadImage: string;
  summary: string;
  extendedPlot: string;
  keyThemes: string[];
  characters: Character[];
  teamPlans: TeamPlan[];
  destinations: Destination[];
  scienceConcepts: ScienceConcept[];
  quotes: string[];
}

export const bookData: BookOverviewData = {
  title: "Galaktikada bir kun",
  part: "2-kitob: Kosmik sarguzasht davom etmoqda",
  tagline: "Yulduzlararo yangi manzillar, ilmiy sirlar va cheksiz fazo chorlovi",
  genre: "Ilmiy-fantastika · Oʻsmirlar adabiyoti · Kosmik sarguzasht",
  coverImage: "/assets/aistudio/image_b9fb6f50.png",
  spaceshipImage: "/assets/aistudio/image_270b4f68.png",
  bannerImage: "/src/assets/images/cosmic_galaxy_exploration_1794061626532.jpg",
  ahmadImage: "/assets/aistudio/image_1821e525.png",
  
  summary: `„Galaktikada bir kun 2“ — isteʼdodli yozuvchi va filolog Saʼdullo Quronov qalamiga mansub mashhur ilmiy-fantastik qissaning intiqlik bilan kutilgan davomi. Kitob oʻzbek bolalar adabiyotida yangi davrni boshlab bergan boʻlib, yosh kitobxonda fazoviy kashfiyotlar, astronomiya qonuniyatlari, zamonaviy robototexnika va eng muhimi — doʻstlik hamda ona sayyoramiz Yerni asrab-avaylash hissini uygʻotadi.`,

  extendedPlot: `Ushbu 2-kitobda 12 yoshli yerlik vunderkind Ahmad, uning hissiyotchan sodiq doʻsti Margol hamda guruhning sovuqqon xakerlik ustasi Moki galaktikaning ilgari hech bir sivilizatsiya qadam bosmagan olis va oʻta xavfli sarhadlariga yoʻl oladilar. Ularning bosh maqsadi — galaktikada muvozanatni ushlab turuvchi yoki uni butkul yoʻq qilib yuborishi mumkin boʻlgan sirli kuch — „Koinot javohiri“ni topish va yovuz kuchlardan himoya qilishdir!`,

  keyThemes: [
    "Ilmiy tafakkur va astronomiyaga mehr uygʻotish",
    "Doʻstlik va birdamlik: Ahmad, Margol va Mokining jamoaviy kuchi",
    "„Koinot javohiri“ sirlari va galaktika muvozanati",
    "Zamonaviy texnologiyalar, xakerlik va kibertizimlar",
    "Ona sayyoramiz Yerni qadrlash va yovuzlikka qarshi aql bilan kurash"
  ],

  characters: [
    {
      name: "Ahmad",
      role: "12 yoshli yerlik vunderkind, jamoa yetakchisi",
      badge: "Daho vunderkind",
      avatar: "/assets/aistudio/image_1821e525.png",
      traits: ["Oʻta aqlli", "Ogʻir-vazmin", "Kvant mexanikasi va torlar nazariyasi dahosi", "Sadoqatli yetakchi"],
      description: `Oʻta aqlli, ogʻir-vazmin, koinot sirlarini va murakkab fizik qonunlarni (kvant mexanikasi, torlar nazariyasi) mukammal biladigan daho. U gʻoyat sadoqatli, qiyin vaziyatlarda tushkunlikka tushmaydi, jamoasiga boshchilik qiladi va har qanday muammoni kuch bilan emas, aql bilan yechishga intiladi.`
    },
    {
      name: "Margol",
      role: "Ahmadning koinotdagi eng yaqin doʻsti",
      badge: "Sodiq safdosh",
      traits: ["Hissiyotchan", "Tez munosabat bildiruvchi", "Gʻoyat sadoqatli", "Iqtisodiy / valyuta xavotirlari"],
      description: `Ahmadning koinotdagi eng yaqin doʻstlaridan biri. Biroz hissiyotchan, voqealarga tez munosabat bildiradi, ammo sodiq va doimo Ahmadni qoʻllab-quvvatlaydi. Pul yoki iqtisodiy masalalarda (masalan, koinot valyutasi — lungi yetishmaganida) koʻproq tashvishlanadigan xarakterga ega.`
    },
    {
      name: "Moki",
      role: "Guruhning texnik va xakerlik aʼzosi",
      badge: "Kiber-xaker robot",
      traits: ["Oʻta aqlli", "Sovuqqon", "His-tuygʻulardan xoli", "Kompyuter tizimlarini buzish ustasi"],
      description: `Guruhning texnik va xakerlik qobiliyatlariga ega boʻlgan aʼzosi (robot yoki maxsus yordamchi). U oʻta aqlli, biroq his-tuygʻulardan yiroq, vazifaga yoʻnaltirilgan, kompyuter tizimlari va yuqori texnologiyalarni osongina buzib kirishga usta boʻlgan sovuqqon feʼl-atvorli obraz.`
    },
    {
      name: "Bobosi",
      role: "Donishmand olim va murabbiy",
      badge: "Kashfiyotchi olim",
      traits: ["Muhandis", "Fazo kemasi yaratuvchisi", "Hayotiy donolik", "Murabbiy"],
      description: `Noyob fazo kemasini yaratgan donishmand olim. Ahmadga nafaqat murakkab fizika va astronomiya qonunlarini, balki qiyinchiliklarda sabot bilan aql ishlatishni oʻrgatgan ustozi.`
    }
  ],

  teamPlans: [
    {
      title: "Sirlarni yechish va tinchlikni saqlash",
      subtitle: "Bosh maqsad: „Koinot javohiri“",
      description: `Jamoaning bosh rejasi — galaktikada muvozanatni ushlab turuvchi yoki uni butkul yoʻq qilib yuborishi mumkin boʻlgan sirli kuch — „Koinot javohiri“ni topish va uning sirlarini yechish.`,
      iconName: "Shield"
    },
    {
      title: "Tizimlarni chetlab oʻtish (Xakerlik)",
      subtitle: "Koinot valyutasi: Lungi yetishmasligi",
      description: `Koinotdagi qimmatbaho pullar (koinot lungi) va maʼlumot olishdagi cheklovlar tufayli, ular oʻzlariga kerakli xaritalar va maʼlumotlar bazasini qoʻlga kiritish uchun maxsus xakerlik rejalari tuzishadi (masalan, koinot kompyuterlarining himoya tizimini buzish).`,
      iconName: "Cpu"
    },
    {
      title: "Yovuzlikka qarshi kurash",
      subtitle: "Koinotni zabt etuvchilarga qarshi mudofaa",
      description: `Ahmad oʻzining noyob fazo kemasini va ilmiy kashfiyotlarini koinotni zabt etmoqchi boʻlgan vahshiy yovuz kuchlardan himoya qilish hamda galaktika tinchligini asrash rejasini tuzadi.`,
      iconName: "Sword"
    }
  ],

  destinations: [
    {
      title: "Nomaʼlum va oʻrganilmagan koinot hududlari",
      subtitle: "Xaritalarda koʻrsatilmagan xavfli fazo",
      description: `2-kitobda qahramonlar galaktikaning ilgari hech bir sivilizatsiya qadam bosmagan, xaritalarda koʻrsatilmagan mutlaqo olis va oʻta xavfli hududlariga yoʻl oladilar.`,
      features: [
        "Hech bir sivilizatsiya bormagan koordinatalar",
        "Gravitatsion anomaliyalar va qora tuynuklar atrofidagi fazo",
        "Kutilmagan toʻsiqlar va oʻrganilmagan xavflar"
      ]
    },
    {
      title: "Koinot muzeylari va maʼlumotlar markazi",
      subtitle: "Axborot shaharchalari va sirli laboratoriyalar",
      description: `Ular oʻzlariga kerakli yoʻnalishni aniqlab olish uchun dastlab koinotdagi maxsus axborot markazlari va muzey shaharchalariga qoʻnishadi. Biroq u yerda xizmatlar oʻta qimmat boʻlgani sababli, chigal vaziyatlarga tushib, sirli binolar va murakkab koinot laboratoriyalari boʻylab harakatlanishga majbur boʻlishadi.`,
      features: [
        "Qimmatbaho maʼlumotlar bazalari",
        "Koinot kompyuterlarining xavfsizlik toʻsiqlari",
        "Moki va Ahmadning tezkor xakerlik operatsiyalari"
      ]
    }
  ],

  scienceConcepts: [
    {
      title: "Kvant mexanikasi va torlar nazariyasi",
      shortDesc: "Koinotning eng fundamental mikrozarralari va tebranishlari",
      bookContext: "12 yoshli vunderkind Ahmad murakkab fizik qonunlar, kvant mexanikasi va torlar nazariyasini chuqur bilib, krizis vaziyatlarda aql bilan yoʻl topadi."
    },
    {
      title: "Qora tuynuklar va gravitatsion tuzoq",
      shortDesc: "Tortishish kuchi shu qadar kuchliki, hatto yorugʻlik ham qochib qutulolmaydi",
      bookContext: "Ahmad fazo kemasi illyuminatoridan qora tuynuk atrofidagi yorqin akkresion diskni kuzatib, gravitatsion hisob-kitoblarni amalga oshiradi."
    },
    {
      title: "Koinot valyutasi (Lungi) va iqtisodiy tizim",
      shortDesc: "Yulduzlararo savdo va maʼlumotlar markazi valyutasi",
      bookContext: "Koinot axborot markazlarida barcha xizmatlar lungi valyutasida boʻlib, uning yetishmasligi qahramonlarni topqir xakerlik rejalari tuzishga undaydi."
    },
    {
      title: "Gravitatsiya va tortishish kuchi",
      shortDesc: "Katta massali jismlarning fazo-vaqt egriligini hosil qilishi",
      bookContext: "Sayyoralar va qora tuynuklar tortishish maydonidan foydalanib yoqilgʻi tejash manevrini amalga oshiradilar."
    }
  ],

  quotes: [
    "„Ushbu qismda Ahmad oʻzining oʻtkir zehni hamda sodiq doʻstlari Margol va Mokining yordami bilan har qanday qiyin toʻsiqlarni yengib oʻtadi.“",
    "„Koinot javohiri — bu nafaqat cheksiz quvvat, balki butun galaktika muvozanatining kalitidir.“",
    "„Muammolarni kuch bilan emas, aql va ilm bilan yechish kerak.“ — Ahmad"
  ]
};
