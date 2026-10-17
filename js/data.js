/**
 * Project and Portfolio Data for Ari Eka Prianda
 * Backend / Fullstack Developer
 */

const PORTFOLIO_DATA = {
  developer: {
    name: "Ari Eka Prianda",
    role: "Backend / Fullstack Developer",
    status: "OPERATIONAL // READY FOR DISPATCH",
    location: "Bogor, Indonesia (UTC+7 / WIB)",
    email: "ariekaprianda@gmail.com",
    github: "https://github.com/ariekakagerou",
    linkedin: "https://linkedin.com/in/ari-eka-prianda",
    bio: "Fresh Graduate S1 Teknik Informatika dengan fokus utama pada perancangan arsitektur backend scalable, RESTful API, integrasi middleware, dan aplikasi web modern berbasis Next.js dan ASP.NET Core.",
    stats: {
      yearsExperience: "2+",
      academicGPA: "3.63",
      projectsAndAPIs: "5+",
      certifications: "6"
    }
  },

  projects: {
    "bpjs": {
      id: "01",
      category: "ENTERPRISE INTEGRATION",
      title: "SIMA BPJS Integration API",
      subtitle: "Healthcare Enterprise Middleware Architecture",
      description: "API integration system connecting internal healthcare management systems (SIMA) with BPJS Kesehatan servers using ASP.NET, Node.js, and SOAP/XML protocols.",
      overview: "Sistem middleware integrasi tingkat perusahaan yang memfasilitasi pertukaran data rujukan, klaim asuransi, dan verifikasi kepesertaan BPJS Kesehatan secara real-time. Dibangun dengan fokus pada keandalan transmisi XML/SOAP, verifikasi payload HMAC, dan audit log kepatuhan ketat.",
      image: "assets/images/project_bpjs.svg",
      techStack: ["ASP.NET Core", "Node.js", "Oracle DB", "SOAP Protocol", "XML Encryption", "REST Gateway"],
      features: [
        "Sinkronisasi data peserta BPJS & status eligibilitas secara otomatis",
        "Enkripsi payload XML dan autentikasi signature HMAC-SHA256",
        "Fail-safe retry mechanism dengan dead-letter queue untuk mencegah klaim hilang",
        "Optimasi query transaksi pada Oracle Database berkapasitas jutaan baris",
        "Audit logging komprehensif untuk rekam jejak compliance BPJS"
      ],
      architecture: "Client Web App -> ASP.NET API Gateway -> Oracle DB Stored Procedures -> BPJS Central WebService (SOAP/WSDL)",
      metrics: {
        uptime: "99.94%",
        latency: "< 180ms",
        dailyCalls: "45,000+ requests"
      },
      links: {
        github: "https://github.com/ariekakagerou/sima_Bpjs_api",
        demo: "#"
      }
    },

    "h5": {
      id: "02",
      category: "OFFICIAL WEBSITE",
      title: "H5-Revolution — Official Website",
      subtitle: "Modern Responsive Band & Lifestyle Official Website",
      description: "Website resmi grup H5-Revolution — Single Page Application dibangun dengan React + Vite, styling menggunakan Tailwind CSS. Demo statis & showcase frontend (no backend).",
      overview: "Website resmi H5-Revolution yang dirancang sebagai Single Page Application (SPA) responsif dan interaktif menggunakan React dan Vite. Menampilkan profil, portofolio karya, galeri visual, dan tautan resmi dengan performa loading instan berkat utility class Tailwind CSS dan bundling Vite yang teroptimasi.",
      image: "images/h5-revolution-banner.jpg",
      techStack: ["React", "Vite", "Tailwind CSS", "JavaScript", "HTML5", "CSS3", "Vercel"],
      features: [
        "Single Page Application (SPA) ultra-cepat berbasis React + Vite",
        "Styling responsif mobile-first menggunakan utility class Tailwind CSS",
        "Komponen modular interaktif dengan React Router dan navigasi mulus",
        "Optimasi asset gambar dan build production statis berlatensi rendah",
        "Deployment otomatis terintegrasi dengan jaringan edge Vercel"
      ],
      architecture: "React (Vite SPA) -> Static Production Build -> Vercel Edge CDN",
      metrics: {
        architecture: "Pure Frontend SPA",
        styling: "Tailwind CSS",
        hosting: "Vercel Edge"
      },
      links: {
        github: "https://github.com/ariekakagerou/H5-Revolution",
        demo: "https://h5-revolution.vercel.app"
      }
    },

    "youth": {
      id: "03",
      category: "REAL-TIME SYSTEM",
      title: "Youth Trigger Backend",
      subtitle: "High-Concurrency WebSocket & Community Messaging Engine",
      description: "Real-time high performance backend engine engineered with Node.js, Express, Socket.io, Redis caching layer, and optimized MySQL queries.",
      overview: "Backend sistem berkecepatan tinggi yang dirancang untuk mendukung obrolan multi-ruang seketika, notifikasi push instan, pengunggahan berkas media, serta arsitektur pub-sub berbasis Redis yang sanggup menangani beban lalu lintas pengguna tinggi.",
      image: "assets/images/project_youth.svg",
      techStack: ["Node.js", "Express.js", "Socket.io", "Redis Pub/Sub", "MySQL", "JWT Auth", "Multer"],
      features: [
        "WebSocket messaging engine dengan low-latency broadcast",
        "Redis Pub/Sub adapter untuk horizontal socket scaling",
        "Optimasi schema database MySQL dengan indexing komposit",
        "Pipeline upload media terenkripsi dengan chunk streaming",
        "Dokumentasi API interaktif berbasis OpenAPI / Swagger"
      ],
      architecture: "Socket.io Client -> Node.js Cluster -> Redis Cache/PubSub -> MySQL Relational Engine",
      metrics: {
        concurrency: "10,000+ simultaneous connections",
        messageDelay: "< 25ms round-trip",
        memoryFootprint: "Optimized Node.js cluster buffers"
      },
      links: {
        github: "https://github.com/ariekakagerou/Youth-Tiger-Soccer-School-back-end-",
        demo: "#"
      }
    },

    "bumdesa": {
      id: "04",
      category: "ENTERPRISE COMMERCE",
      title: "BUMDesa Digital Commerce API",
      subtitle: "Village Enterprise Management & Online Distribution Platform",
      description: "Backend architecture built during internship for village-owned enterprise, handling product catalogs, inventory transactions, shipment integrations, and reporting.",
      overview: "Sistem backend komersial yang dirancang khusus untuk memodernisasi distribusi komoditas desa secara digital. Mengintegrasikan otentikasi role-based, manajemen transaksi multikurir, perhitungan pajak otomatis, dan rekapitulasi data penjualan berkala.",
      image: "assets/images/project_bumdesa.svg",
      techStack: ["Node.js", "Express.js", "MySQL", "RESTful API", "JWT Auth", "Postman"],
      features: [
        "Otentikasi multi-peran (Admin Desa, Mitra Pedagang, Konsumen)",
        "Manajemen siklus hidup transaksi dari invoice hingga delivery completion",
        "Optimasi relasi foreign key & query agregasi laporan laba-rugi",
        "Pengujian fungsional dan automated collection test menggunakan Postman",
        "Integrasi webhook notifikasi status pesanan via email & SMS"
      ],
      architecture: "Frontend Web Portal -> Express REST Services -> MySQL Relational DB -> Transaction Reporter",
      metrics: {
        endpointCoverage: "42 API Endpoints",
        dataIntegrity: "100% ACID compliant",
        queryLatency: "< 35ms avg"
      },
      links: {
        github: "https://github.com/ariekakagerou/Bmdesa_backend",
        demo: "#"
      }
    },

    "saada": {
      id: "05",
      category: "AI & ARCHIVE SYSTEM",
      title: "SAADA (Sistem Arsip Alumni Digital ASSA'ADAH)",
      subtitle: "AI-Powered Document Archive & Alumni Registry",
      description: "Sistem digitalisasi dan pengarsipan ijazah serta berkas alumni berbasis AI OCR menggunakan Python Tesseract, backend ASP.NET Core REST API, dan frontend modern Next.js.",
      overview: "Platform komprehensif untuk mendigitalkan, mengindeks, dan memverifikasi arsip dokumen serta ijazah alumni secara otomatis. Memanfaatkan AI-Service berbasis Python dengan engine Tesseract OCR untuk mengekstrak data teks dari berkas fisik, diproses melalui RESTful API backend ASP.NET Core yang tangguh, dan disajikan melalui antarmuka responsif Next.js.",
      image: "assets/images/Tampilan (Desktop).png",
      techStack: ["Next.js", "ASP.NET Core", "Python", "Tesseract OCR", "PostgreSQL", "RESTful API", "OpenCV"],
      features: [
        "Ekstraksi teks otomatis & pengenalan karakter ijazah alumni via AI Service Python (Tesseract OCR)",
        "Pre-processing citra dokumen (binarization, skew correction, noise removal) sebelum proses OCR",
        "Backend RESTful API ASP.NET Core dengan otentikasi role-based dan integritas data ACID",
        "Frontend interaktif Next.js dengan fitur penelusuran cepat alumni & viewer dokumen digital",
        "Sistem audit trail dan manajemen arsip digital terorganisir per angkatan"
      ],
      architecture: "Next.js UI -> ASP.NET Core Web API -> Python AI Microservice (Tesseract OCR) -> PostgreSQL & File Storage",
      metrics: {
        ocrAccuracy: "98.6% Accuracy",
        latency: "< 850ms / page",
        capacity: "10,000+ Records"
      },
      links: {
        github: "https://github.com/ariekakagerou/saada-digital-archive",
        demo: "#"
      }
    }
  },

  certificates: [
    {
      id: "cert-01",
      title: "Belajar Dasar Bahasa Pemrograman dengan Python",
      issuer: "Mounev Academy",
      category: "SOFTWARE",
      date: "2024",
      path: "assets/Sertifikat/Ari eka prianda - Certificate of BelajarDasarBahasaPemrogramanDenganPython by Mounev Academy.pdf",
      skills: ["Python", "Control Flow", "Data Structures", "Algorithm Basics"]
    },
    {
      id: "cert-02",
      title: "Engineering Resilience: Microservices' Contribution to High Scalability in Tech Company",
      issuer: "Maxy Academy",
      category: "ARCHITECTURE",
      date: "2024",
      path: "assets/Sertifikat/Verifikasi Sertifikat – Ari Eka Prianda – Maxy Academy.pdf",
      skills: ["Microservices", "System Scalability", "Resilience Patterns", "Fault Tolerance"]
    },
    {
      id: "cert-03",
      title: "CCNA: Introduction to Networks",
      issuer: "Cisco Networking Academy",
      category: "NETWORKING",
      date: "2023",
      path: "assets/Sertifikat/E-Sertifikat ARI EKA PRIANDA.pdf",
      skills: ["TCP/IP", "Subnetting", "Routing & Switching", "Network Security"]
    },
    {
      id: "cert-04",
      title: "Webinar: Prinsip Dasar UI/UX Designer",
      issuer: "Eduwork",
      category: "DESIGN",
      date: "2023",
      path: "assets/Sertifikat/Sertifikat-101123.pdf",
      skills: ["User Centered Design", "Wireframing", "Usability Heuristics", "Design Systems"]
    },
    {
      id: "cert-05",
      title: "Sertifikat Partisipasi: Seminar APBN 2024 & Outlook APBN 2025",
      issuer: "Tax Center Universitas Binaniaga Indonesia & DJP Kemenkeu",
      category: "SEMINAR",
      date: "2024",
      path: "assets/certificates/Ari Eka.png",
      skills: ["Public Finance", "Economic Outlook", "Taxation Principles", "National Budget Analysis"]
    },
    {
      id: "cert-06",
      title: "Seminar: Meningkatkan Kepercayaan Masyarakat Terhadap Industri Perasuransian Nasional",
      issuer: "Otoritas Jasa Keuangan (OJK) & SB-IPB",
      category: "SEMINAR",
      date: "2023",
      path: "assets/certificates/Screenshot_2.png",
      skills: ["Insurance Literacy", "Financial Services", "Risk Mitigation", "Regulatory Framework"]
    }
  ]
};
