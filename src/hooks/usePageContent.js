import { useState, useEffect } from 'react';
import { fetchApi } from '../services/api';

const fallbackData = {
  home: {
    seoTitle: "Beranda — PT. Alexa Computindo Group",
    seoDescription: "Penyedia solusi Media Digital, ISP, dan Software Enterprise.",
    heroTitleLine1: "MEMBANGUN INFRASTRUKTUR",
    heroTitleHighlight: "DIGITAL MASA DEPAN",
    heroDesc: "PT. Alexa Computindo Group menyediakan solusi Media Digital, ISP Berkecepatan Tinggi, dan Arsitektur Perangkat Lunak untuk skala Enterprise.",
    ctaPrimaryText: "Eksplorasi Layanan",
    ctaPrimaryLink: "/services",
    ctaSecondaryText: "Pelajari Lebih Lanjut",
    ctaSecondaryLink: "/about",
    introTitle: "Fundamen Solid. Inovasi Tanpa Henti.",
    introDesc: "Didirikan sejak tahun 2018, kami telah bertransformasi dari pengembang perangkat lunak menjadi grup teknologi komprehensif yang menaungi tiga divisi utama. Berbekal dedikasi terhadap keunggulan operasional, kami membangun ekosistem digital yang andal bagi ratusan klien enterprise di seluruh Indonesia.",
    stat1Number: "8+",
    stat1Label: "TAHUN PENGALAMAN",
    stat2Number: "99.9%",
    stat2Label: "UPTIME SERVER",
    stat3Number: "200+",
    stat3Label: "KLIEN ENTERPRISE",
    servicesSectionTitle: "DIVISI UTAMA KAMI",
    servicesSectionSubtitle: "Tiga pilar strategis yang menggerakkan ekosistem digital kami.",
    clientsSectionTitle: "DIPERCAYA OLEH PERUSAHAAN TERKEMUKA",
    articlesSectionTitle: "BERITA & INSIGHT",
    articlesSectionSubtitle: "Informasi terkini dari ekosistem digital kami."
  },
  about: {
    seoTitle: "Tentang Kami — PT. Alexa Computindo Group",
    seoDescription: "Sejarah, Visi, Misi dan Tim Manajemen.",
    heroTitle: "TENTANG KAMI",
    historyTitle: "Sejarah Perusahaan",
    historyPar1: "Berdiri pada tahun 2018, PT. Alexa Computindo Group memulai langkah sebagai perusahaan pengembangan perangkat lunak (Swakarya) yang berfokus pada arsitektur sistem informasi enterprise.",
    historyPar2: "Seiring pesatnya adopsi teknologi di Indonesia, kami berekspansi ke sektor infrastruktur jaringan dengan mendirikan divisi InetMedia pada tahun 2020. Setahun kemudian, kami melengkapi ekosistem digital kami dengan divisi MediaKampung sebagai pilar informasi dan publikasi.",
    visionText: "Menjadi grup teknologi dan media terdepan di Asia Tenggara yang menggerakkan transformasi digital secara inklusif, aman, dan berkelanjutan.",
    missionList: "[\"Menyediakan infrastruktur jaringan internet korporat berkecepatan tinggi dengan jaminan SLA terbaik.\",\"Mengembangkan arsitektur perangkat lunak berskala enterprise yang aman, efisien, dan tepat guna.\",\"Menyajikan jurnalisme digital yang kredibel serta layanan publikasi yang membangun reputasi positif.\"]",
    timelineList: "[{\"year\":\"2018\",\"title\":\"PENDIRIAN WEBMEDIA\",\"desc\":\"Fokus awal pada arsitektur sistem informasi enterprise dan aplikasi kustom.\"},{\"year\":\"2020\",\"title\":\"EKSPANSI INETMEDIA\",\"desc\":\"Memperoleh lisensi ISP nasional untuk infrastruktur jaringan dan fiber optik.\"},{\"year\":\"2021\",\"title\":\"PEMBENTUKAN MEDIAKAMPUNG\",\"desc\":\"Menjawab kebutuhan jurnalisme siber dan kemitraan publikasi digital.\"},{\"year\":\"2025\",\"title\":\"KONSOLIDASI GRUP\",\"desc\":\"Menyatukan tiga divisi ke dalam ekosistem PT. Alexa Computindo Group.\"}]",
    teamSectionTitle: "MANAJEMEN INTI"
  },
  services: {
    seoTitle: "Layanan Kami — PT. Alexa Computindo Group",
    seoDescription: "Layanan WebMedia, InetMedia, dan MediaKampung.",
    heroTitle: "LAYANAN KAMI",
    heroDesc: "Solusi end-to-end terintegrasi untuk mempercepat transformasi digital korporasi Anda, mulai dari infrastruktur jaringan, pengembangan aplikasi, hingga publikasi media massa.",
    mainSectionTitle: "Eksplorasi Divisi Kami",
    mainSectionSubtitle: "Pilih divisi yang paling sesuai dengan kebutuhan strategis bisnis Anda.",
    testimonialTitle: "APA KATA KLIEN KAMI?",
    testimonialSubtitle: "Kepercayaan mereka adalah bukti komitmen kami terhadap kualitas."
  },
  contact: {
    seoTitle: "Hubungi Kami — PT. Alexa Computindo Group",
    seoDescription: "Hubungi PT. Alexa Computindo Group untuk pertanyaan dan kerjasama.",
    heroTitle: "HUBUNGI KAMI",
    heroDesc: "Tim ahli kami siap mendiskusikan kebutuhan infrastruktur dan transformasi digital perusahaan Anda. Jangan ragu untuk menghubungi kami melalui form atau kontak di bawah ini.",
    officeAddress: "Gedung Alexa Cyber, Lt. 8\nJl. Teknologi Selatan No. 45\nKawasan SCBD, Jakarta Selatan 12190",
    emailAddress: "hello@alexagroup.co.id",
    phoneNumber: "+62 21 555 1234",
    mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.24009653198!2d106.74955787682285!3d-6.229746497177708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x100c5ea87bd2eb0!2sJakarta%20Selatan%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1705470000000!5m2!1sid!2sid",
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Pertanyaan yang sering diajukan oleh calon klien kami.",
    faqList: "[{\"q\":\"Dimana lokasi operasional PT. Alexa Computindo Group?\",\"a\":\"Kantor pusat kami berlokasi di Jakarta Selatan. Kami melayani klien dari seluruh Indonesia.\"},{\"q\":\"Apakah layanan pengembangan software (WebMedia) termasuk maintenance?\",\"a\":\"Ya, seluruh proyek memiliki SLA dan masa maintenance 3-12 bulan.\"},{\"q\":\"Berapa lama proses pemasangan internet corporate InetMedia?\",\"a\":\"Rata-rata 3-5 hari kerja setelah SPK disetujui.\"}]"
  }
};

export function usePageContent(pageName) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadContent() {
      setLoading(true);
      const res = await fetchApi(`/pages/${pageName}`);
      if (res.success && res.data) {
        setData(res.data);
      } else {
        console.warn(`Failed to fetch page content for ${pageName}, using fallback.`);
        setData(fallbackData[pageName]);
        setError(res.message);
      }
      setLoading(false);
    }
    loadContent();
  }, [pageName]);

  return { data, loading, error };
}
