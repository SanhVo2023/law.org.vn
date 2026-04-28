/* The 50 topics × 2 locales = 100 page taxonomy for law.org.vn.
 * Structure matches PRD: Legal System 10 + Court System 8 + Litigation 10 + Rights 8 + Terminology 8 + FAQ 6 = 50.
 * Each topic: { slug, category, vi:{title,excerpt}, en:{title,excerpt}, outline: [{en,vi}, ...] }
 * `outline` is the list of H2 section titles for both locales — the generator builds structured draft bodies from it.
 */

export const TOPICS = [
  // ─── Legal System (10) ────────────────────────────────────────────────
  {
    slug: 'vietnam-legal-system-overview',
    category: 'legal-system',
    vi: { title: 'Tổng quan hệ thống pháp luật Việt Nam', excerpt: 'Một cái nhìn hệ thống về kiến trúc pháp lý của Việt Nam: Hiến pháp, các đạo luật, văn bản dưới luật và cách chúng vận hành cùng nhau.' },
    en: { title: 'Overview of Vietnam\'s legal system', excerpt: 'A structured view of Vietnam\'s legal architecture: the Constitution, statutes, subordinate instruments, and how they operate together.' },
    outline: [
      { vi: 'Cấu trúc chung', en: 'General structure' },
      { vi: 'Các loại văn bản quy phạm pháp luật', en: 'Categories of normative legal documents' },
      { vi: 'Thứ bậc và hiệu lực', en: 'Hierarchy and legal force' },
      { vi: 'Cơ quan ban hành', en: 'Issuing authorities' },
      { vi: 'Cập nhật và tham chiếu', en: 'Updates and cross-references' },
    ],
  },
  {
    slug: 'constitution-2013',
    category: 'legal-system',
    vi: { title: 'Hiến pháp 2013 — nền tảng pháp lý', excerpt: 'Vai trò, cấu trúc và các nguyên tắc nền tảng của Hiến pháp 2013 — văn bản có hiệu lực cao nhất trong hệ thống pháp luật Việt Nam.' },
    en: { title: 'The 2013 Constitution — Vietnam\'s foundational law', excerpt: 'Role, structure, and foundational principles of Vietnam\'s 2013 Constitution — the supreme source of law.' },
    outline: [
      { vi: 'Bối cảnh và quá trình soạn thảo', en: 'Background and drafting process' },
      { vi: 'Cấu trúc văn bản', en: 'Document structure' },
      { vi: 'Các nguyên tắc nền tảng', en: 'Foundational principles' },
      { vi: 'Quyền con người và quyền công dân', en: 'Human rights and citizen rights' },
      { vi: 'Quan hệ với các đạo luật dưới Hiến pháp', en: 'Relationship with subordinate law' },
    ],
  },
  {
    slug: 'laws-and-codes-hierarchy',
    category: 'legal-system',
    vi: { title: 'Luật và Bộ luật — thứ bậc văn bản pháp luật', excerpt: 'Phân biệt luật và bộ luật, vai trò của Quốc hội và cách thứ bậc hiệu lực được áp dụng khi có mâu thuẫn.' },
    en: { title: 'Laws vs. codes — the legal-instrument hierarchy', excerpt: 'Distinguishing statutes from codes, the role of the National Assembly, and how the hierarchy resolves conflicts.' },
    outline: [
      { vi: 'Khác biệt giữa luật và bộ luật', en: 'Difference between a law and a code' },
      { vi: 'Cơ quan ban hành', en: 'Issuing bodies' },
      { vi: 'Quy tắc về thứ bậc hiệu lực', en: 'Hierarchy-of-force rules' },
      { vi: 'Ví dụ minh hoạ', en: 'Illustrative examples' },
    ],
  },
  {
    slug: 'decrees-role',
    category: 'legal-system',
    vi: { title: 'Nghị định — công cụ điều hành của Chính phủ', excerpt: 'Nghị định là gì, khi nào được ban hành và phạm vi hiệu lực trong thực thi pháp luật.' },
    en: { title: 'Decrees — the government\'s executive instrument', excerpt: 'What decrees are, when they are issued, and the scope of their force in enforcing statute.' },
    outline: [
      { vi: 'Khái niệm và chủ thể ban hành', en: 'Definition and issuer' },
      { vi: 'Khi nào cần nghị định', en: 'When a decree is required' },
      { vi: 'Quan hệ với luật', en: 'Relationship with statutes' },
      { vi: 'Vấn đề thường gặp trong thực thi', en: 'Common enforcement issues' },
    ],
  },
  {
    slug: 'circulars-ministerial-guidance',
    category: 'legal-system',
    vi: { title: 'Thông tư — hướng dẫn cấp bộ', excerpt: 'Vai trò của thông tư trong việc chi tiết hoá luật và nghị định, giới hạn hiệu lực và thẩm quyền ban hành.' },
    en: { title: 'Circulars — ministerial implementation guidance', excerpt: 'How circulars translate statutes and decrees into operational rules, their limits, and issuing authority.' },
    outline: [
      { vi: 'Ai ban hành thông tư?', en: 'Who issues circulars?' },
      { vi: 'Phạm vi và giới hạn', en: 'Scope and limits' },
      { vi: 'Tra cứu thông tư', en: 'How to look up a circular' },
    ],
  },
  {
    slug: 'national-assembly-resolutions',
    category: 'legal-system',
    vi: { title: 'Nghị quyết của Quốc hội', excerpt: 'Phân biệt nghị quyết với luật, vai trò trong chính sách và trường hợp nghị quyết có hiệu lực tương đương luật.' },
    en: { title: 'National Assembly resolutions', excerpt: 'How resolutions differ from statutes, their role in policy, and cases where they carry statutory force.' },
    outline: [
      { vi: 'Nghị quyết là gì?', en: 'What is a resolution?' },
      { vi: 'So sánh với luật', en: 'Comparison with statutes' },
      { vi: 'Ví dụ thực tế', en: 'Real-world examples' },
    ],
  },
  {
    slug: 'legislative-process',
    category: 'legal-system',
    vi: { title: 'Quy trình lập pháp tại Việt Nam', excerpt: 'Các bước từ đề xuất đến thông qua một đạo luật, vai trò của các cơ quan và thời gian điển hình.' },
    en: { title: 'Vietnam\'s legislative process', excerpt: 'From proposal to passage of a statute: the bodies involved, the sequence of readings, and typical timelines.' },
    outline: [
      { vi: 'Đề xuất và soạn thảo', en: 'Proposal and drafting' },
      { vi: 'Thẩm tra và thảo luận', en: 'Examination and debate' },
      { vi: 'Biểu quyết và công bố', en: 'Vote and promulgation' },
      { vi: 'Lấy ý kiến công chúng', en: 'Public consultation' },
    ],
  },
  {
    slug: 'party-role-in-legal-system',
    category: 'legal-system',
    vi: { title: 'Vai trò của Đảng Cộng sản trong hệ thống pháp luật', excerpt: 'Cách Đảng Cộng sản định hướng chính sách pháp luật và quan hệ giữa cương lĩnh đảng với văn bản nhà nước.' },
    en: { title: 'The Communist Party\'s role in the legal system', excerpt: 'How the Communist Party shapes legal policy and the relationship between party platforms and state instruments.' },
    outline: [
      { vi: 'Định hướng chính trị', en: 'Political direction' },
      { vi: 'Quan hệ với Quốc hội và Chính phủ', en: 'Relationship with the Assembly and Government' },
      { vi: 'Điều 4 Hiến pháp', en: 'Article 4 of the Constitution' },
    ],
  },
  {
    slug: 'civil-vs-common-law',
    category: 'legal-system',
    vi: { title: 'Dân luật và thông luật — Việt Nam đứng ở đâu?', excerpt: 'Vì sao hệ thống Việt Nam theo truyền thống dân luật, và những điểm giao thoa với thực tiễn thông luật gần đây.' },
    en: { title: 'Civil law vs. common law — where Vietnam stands', excerpt: 'Why Vietnam follows the civil-law tradition, and recent intersections with common-law practices.' },
    outline: [
      { vi: 'Đặc trưng truyền thống dân luật', en: 'Civil-law tradition\'s core features' },
      { vi: 'Nguồn pháp luật', en: 'Sources of law' },
      { vi: 'Án lệ và vai trò mở rộng', en: 'Precedent and its expanding role' },
    ],
  },
  {
    slug: 'finding-vietnamese-legal-texts',
    category: 'legal-system',
    vi: { title: 'Tra cứu và đọc hiểu văn bản pháp luật Việt Nam', excerpt: 'Các nguồn chính thống để tra cứu luật, cách đọc một văn bản quy phạm và các bẫy thường gặp.' },
    en: { title: 'How to find and read Vietnamese legal texts', excerpt: 'Authoritative sources, the anatomy of a normative document, and common reading pitfalls.' },
    outline: [
      { vi: 'Cổng thông tin chính thức', en: 'Official portals' },
      { vi: 'Cấu trúc một văn bản pháp luật', en: 'Anatomy of a normative document' },
      { vi: 'Xác định văn bản còn hiệu lực', en: 'Confirming a document is in force' },
    ],
  },

  // ─── Court System (8) ─────────────────────────────────────────────────
  {
    slug: 'court-system-overview',
    category: 'court-system',
    vi: { title: 'Tổng quan hệ thống tòa án Việt Nam', excerpt: 'Bốn cấp tòa, phạm vi thẩm quyền và cách các vụ việc dịch chuyển trong hệ thống.' },
    en: { title: 'Overview of Vietnam\'s court system', excerpt: 'The four tiers of courts, their jurisdictions, and how cases move through the system.' },
    outline: [
      { vi: 'Bốn cấp tòa', en: 'The four tiers' },
      { vi: 'Nguyên tắc hoạt động', en: 'Operating principles' },
      { vi: 'Quan hệ với Viện kiểm sát', en: 'Relationship with the Procuracy' },
    ],
  },
  {
    slug: 'supreme-peoples-court',
    category: 'court-system',
    vi: { title: 'Tòa án Nhân dân Tối cao', excerpt: 'Chức năng giám đốc thẩm, tái thẩm và vai trò phát triển án lệ của Tòa án Nhân dân Tối cao.' },
    en: { title: 'The Supreme People\'s Court', excerpt: 'Supervisory and re-opening review, and the SPC\'s role in developing precedent.' },
    outline: [
      { vi: 'Chức năng cốt lõi', en: 'Core functions' },
      { vi: 'Giám đốc thẩm và tái thẩm', en: 'Supervisory and re-opening review' },
      { vi: 'Án lệ', en: 'Precedent' },
    ],
  },
  {
    slug: 'high-peoples-courts',
    category: 'court-system',
    vi: { title: 'Tòa án Nhân dân cấp cao', excerpt: 'Ba tòa cấp cao theo khu vực, thẩm quyền phúc thẩm và quan hệ với tòa tỉnh.' },
    en: { title: 'High People\'s Courts', excerpt: 'The three regional high courts, appellate jurisdiction, and their relationship with provincial courts.' },
    outline: [
      { vi: 'Phạm vi khu vực', en: 'Regional jurisdictions' },
      { vi: 'Thẩm quyền phúc thẩm', en: 'Appellate authority' },
      { vi: 'Thống kê điển hình', en: 'Typical caseload' },
    ],
  },
  {
    slug: 'provincial-peoples-courts',
    category: 'court-system',
    vi: { title: 'Tòa án Nhân dân cấp tỉnh', excerpt: 'Thẩm quyền sơ thẩm và phúc thẩm của tòa cấp tỉnh, khi nào vụ việc thuộc tòa tỉnh thay vì tòa huyện.' },
    en: { title: 'Provincial People\'s Courts', excerpt: 'First-instance and appellate jurisdiction; when a matter belongs at provincial rather than district level.' },
    outline: [
      { vi: 'Thẩm quyền theo loại án', en: 'Jurisdiction by case type' },
      { vi: 'Sơ thẩm so với phúc thẩm', en: 'First instance vs. appeals' },
    ],
  },
  {
    slug: 'district-peoples-courts',
    category: 'court-system',
    vi: { title: 'Tòa án Nhân dân cấp huyện', excerpt: 'Cửa vào của hầu hết các vụ việc dân sự — thẩm quyền, hạn chế và tần suất thực tiễn.' },
    en: { title: 'District People\'s Courts', excerpt: 'The entry point for most civil matters — jurisdiction, limits, and practical frequency.' },
    outline: [
      { vi: 'Thẩm quyền sơ thẩm', en: 'First-instance jurisdiction' },
      { vi: 'Giới hạn tài phán', en: 'Jurisdictional limits' },
      { vi: 'Quan hệ với tòa tỉnh', en: 'Relationship with the provincial court' },
    ],
  },
  {
    slug: 'peoples-procuracy',
    category: 'court-system',
    vi: { title: 'Viện kiểm sát Nhân dân', excerpt: 'Vai trò công tố, giám sát tư pháp và vị trí độc lập của Viện kiểm sát trong hệ thống tư pháp.' },
    en: { title: 'The People\'s Procuracy', excerpt: 'Prosecution, judicial oversight, and the Procuracy\'s independent position in the justice system.' },
    outline: [
      { vi: 'Công tố', en: 'Prosecution' },
      { vi: 'Giám sát tư pháp', en: 'Judicial oversight' },
      { vi: 'Quan hệ với tòa án', en: 'Relationship with the courts' },
    ],
  },
  {
    slug: 'civil-judgment-enforcement',
    category: 'court-system',
    vi: { title: 'Thi hành án dân sự', excerpt: 'Sau khi bản án có hiệu lực: cơ quan thi hành án, các biện pháp cưỡng chế và thời hiệu thi hành.' },
    en: { title: 'Civil judgment enforcement', excerpt: 'After judgment: the enforcement authority, coercive measures, and time limits.' },
    outline: [
      { vi: 'Cơ quan thi hành án', en: 'The enforcement authority' },
      { vi: 'Biện pháp cưỡng chế', en: 'Coercive measures' },
      { vi: 'Thời hiệu thi hành', en: 'Enforcement time limits' },
    ],
  },
  {
    slug: 'commercial-arbitration',
    category: 'court-system',
    vi: { title: 'Trọng tài thương mại tại Việt Nam', excerpt: 'Khi nào chọn trọng tài thay vì toà án, các trung tâm trọng tài lớn và khả năng công nhận phán quyết nước ngoài.' },
    en: { title: 'Commercial arbitration in Vietnam', excerpt: 'When to choose arbitration over courts, major arbitration centers, and recognition of foreign awards.' },
    outline: [
      { vi: 'Ưu điểm và hạn chế', en: 'Advantages and limits' },
      { vi: 'Các trung tâm trọng tài chính', en: 'Major arbitration centers' },
      { vi: 'Công nhận và thi hành phán quyết', en: 'Recognition and enforcement of awards' },
    ],
  },

  // ─── Litigation (10) ──────────────────────────────────────────────────
  {
    slug: 'civil-procedure-overview',
    category: 'litigation',
    vi: { title: 'Tố tụng dân sự — tổng quan', excerpt: 'Các giai đoạn cốt lõi của một vụ việc dân sự từ khởi kiện đến thi hành, và vai trò của từng bên.' },
    en: { title: 'Civil procedure — overview', excerpt: 'The core phases of a civil matter from filing through enforcement, and each party\'s role.' },
    outline: [
      { vi: 'Các bên tham gia', en: 'Parties to the proceeding' },
      { vi: 'Các giai đoạn cốt lõi', en: 'Core phases' },
      { vi: 'Thời hạn điển hình', en: 'Typical timeline' },
    ],
  },
  {
    slug: 'filing-a-civil-lawsuit',
    category: 'litigation',
    vi: { title: 'Khởi kiện vụ án dân sự', excerpt: 'Hồ sơ khởi kiện, tòa án thụ lý và các lỗi khiến đơn kiện bị trả lại.' },
    en: { title: 'Filing a civil lawsuit', excerpt: 'Filing packet, the receiving court, and common reasons a complaint is returned.' },
    outline: [
      { vi: 'Hồ sơ và đơn khởi kiện', en: 'The complaint and supporting documents' },
      { vi: 'Án phí và tạm ứng', en: 'Court fees and advances' },
      { vi: 'Thụ lý và từ chối', en: 'Acceptance and refusal' },
    ],
  },
  {
    slug: 'civil-mediation',
    category: 'litigation',
    vi: { title: 'Hòa giải trong tố tụng dân sự', excerpt: 'Vai trò bắt buộc của hòa giải, các trường hợp miễn hòa giải và giá trị pháp lý của biên bản hòa giải.' },
    en: { title: 'Mediation in civil proceedings', excerpt: 'The mandatory role of mediation, exemptions, and the legal force of mediation records.' },
    outline: [
      { vi: 'Khi nào bắt buộc hòa giải', en: 'When mediation is mandatory' },
      { vi: 'Các trường hợp miễn', en: 'Exemptions' },
      { vi: 'Biên bản hòa giải và hiệu lực', en: 'Records and their legal force' },
    ],
  },
  {
    slug: 'first-instance-civil-trial',
    category: 'litigation',
    vi: { title: 'Phiên toà sơ thẩm dân sự', excerpt: 'Trình tự một phiên toà sơ thẩm, vai trò của thẩm phán, đương sự và luật sư.' },
    en: { title: 'First-instance civil trial', excerpt: 'Order of a first-instance trial; the judge\'s role, parties, and counsel.' },
    outline: [
      { vi: 'Trình tự phiên xử', en: 'Order of the proceeding' },
      { vi: 'Vai trò thẩm phán', en: 'Role of the judge' },
      { vi: 'Tranh luận và nghị án', en: 'Argument and deliberation' },
    ],
  },
  {
    slug: 'civil-appeal-procedure',
    category: 'litigation',
    vi: { title: 'Phúc thẩm dân sự', excerpt: 'Thời hiệu kháng cáo, đối tượng có quyền kháng cáo và những gì phúc thẩm có thể thay đổi.' },
    en: { title: 'Civil appeal procedure', excerpt: 'Appeal deadlines, who may appeal, and what the appellate court may change.' },
    outline: [
      { vi: 'Thời hiệu kháng cáo', en: 'Appeal deadlines' },
      { vi: 'Chủ thể có quyền kháng cáo', en: 'Who may appeal' },
      { vi: 'Phạm vi xem xét', en: 'Scope of review' },
    ],
  },
  {
    slug: 'cassation-supervisory-review',
    category: 'litigation',
    vi: { title: 'Giám đốc thẩm', excerpt: 'Phân biệt giám đốc thẩm với phúc thẩm, điều kiện kháng nghị và hiệu lực của quyết định.' },
    en: { title: 'Cassation (supervisory review)', excerpt: 'How cassation differs from appeal, the conditions for a protest, and the force of the resulting decision.' },
    outline: [
      { vi: 'Khác biệt với phúc thẩm', en: 'Difference from ordinary appeal' },
      { vi: 'Điều kiện kháng nghị', en: 'Conditions for a protest' },
      { vi: 'Hệ quả pháp lý', en: 'Legal consequences' },
    ],
  },
  {
    slug: 'criminal-procedure-overview',
    category: 'litigation',
    vi: { title: 'Tố tụng hình sự — tổng quan', excerpt: 'Các giai đoạn điều tra, truy tố, xét xử và quyền của bị can, bị cáo ở từng bước.' },
    en: { title: 'Criminal procedure — overview', excerpt: 'The phases of investigation, prosecution, and trial, and an accused\'s rights at each step.' },
    outline: [
      { vi: 'Khởi tố và điều tra', en: 'Indictment and investigation' },
      { vi: 'Truy tố', en: 'Prosecution' },
      { vi: 'Xét xử', en: 'Trial' },
      { vi: 'Quyền của bị can, bị cáo', en: 'Rights of the accused' },
    ],
  },
  {
    slug: 'administrative-litigation',
    category: 'litigation',
    vi: { title: 'Tố tụng hành chính', excerpt: 'Khi công dân khởi kiện quyết định hành chính: đối tượng khởi kiện, thời hiệu và toà có thẩm quyền.' },
    en: { title: 'Administrative litigation', excerpt: 'Citizens challenging administrative decisions: what can be challenged, time limits, and the competent court.' },
    outline: [
      { vi: 'Đối tượng khởi kiện', en: 'What decisions can be challenged' },
      { vi: 'Thời hiệu', en: 'Time limits' },
      { vi: 'Toà có thẩm quyền', en: 'The competent court' },
    ],
  },
  {
    slug: 'labor-dispute-resolution',
    category: 'litigation',
    vi: { title: 'Giải quyết tranh chấp lao động', excerpt: 'Con đường từ hoà giải cơ sở đến trọng tài lao động và toà án — khi nào chọn con đường nào.' },
    en: { title: 'Labor dispute resolution', excerpt: 'From workplace conciliation to labor arbitration and courts — when to use each path.' },
    outline: [
      { vi: 'Hoà giải cơ sở', en: 'Workplace conciliation' },
      { vi: 'Trọng tài lao động', en: 'Labor arbitration' },
      { vi: 'Khởi kiện tại toà', en: 'Filing in court' },
    ],
  },
  {
    slug: 'evidence-rules',
    category: 'litigation',
    vi: { title: 'Quy tắc chứng cứ tại toà án Việt Nam', excerpt: 'Các loại chứng cứ được thừa nhận, nghĩa vụ cung cấp chứng cứ và giá trị của chứng cứ điện tử.' },
    en: { title: 'Evidence rules in Vietnamese courts', excerpt: 'Accepted categories of evidence, each party\'s duty to produce, and the standing of digital evidence.' },
    outline: [
      { vi: 'Các loại chứng cứ', en: 'Categories of evidence' },
      { vi: 'Nghĩa vụ cung cấp chứng cứ', en: 'Duty to produce evidence' },
      { vi: 'Chứng cứ điện tử', en: 'Digital evidence' },
    ],
  },

  // ─── Rights (8) ───────────────────────────────────────────────────────
  {
    slug: 'constitutional-rights-overview',
    category: 'rights',
    vi: { title: 'Quyền hiến định — tổng quan', excerpt: 'Các quyền cơ bản được ghi nhận trong Hiến pháp 2013 và cách chúng được bảo đảm bởi pháp luật.' },
    en: { title: 'Constitutional rights — overview', excerpt: 'Fundamental rights recognised by the 2013 Constitution and how they are given effect by statute.' },
    outline: [
      { vi: 'Nhóm quyền dân sự và chính trị', en: 'Civil and political rights' },
      { vi: 'Nhóm quyền kinh tế, xã hội, văn hoá', en: 'Economic, social and cultural rights' },
      { vi: 'Giới hạn quyền', en: 'Limits on rights' },
    ],
  },
  {
    slug: 'freedom-of-expression',
    category: 'rights',
    vi: { title: 'Quyền tự do ngôn luận', excerpt: 'Phạm vi, giới hạn và các loại hình biểu đạt được điều chỉnh bởi luật chuyên ngành.' },
    en: { title: 'Freedom of expression', excerpt: 'Scope, limits, and the specialised statutes that regulate particular forms of expression.' },
    outline: [
      { vi: 'Cơ sở hiến định', en: 'Constitutional basis' },
      { vi: 'Giới hạn theo pháp luật', en: 'Statutory limits' },
      { vi: 'Thực tiễn trên không gian mạng', en: 'Online practice' },
    ],
  },
  {
    slug: 'property-rights',
    category: 'rights',
    vi: { title: 'Quyền sở hữu tại Việt Nam', excerpt: 'Tài sản cá nhân, quyền sử dụng đất và cách hệ thống pháp luật bảo hộ sở hữu tư nhân.' },
    en: { title: 'Property rights in Vietnam', excerpt: 'Personal property, land-use rights, and how the legal system protects private ownership.' },
    outline: [
      { vi: 'Các loại tài sản', en: 'Categories of property' },
      { vi: 'Quyền sử dụng đất', en: 'Land-use rights' },
      { vi: 'Bảo hộ tài sản', en: 'Protection of property' },
    ],
  },
  {
    slug: 'inheritance-rights',
    category: 'rights',
    vi: { title: 'Quyền thừa kế', excerpt: 'Thừa kế theo pháp luật và theo di chúc, hàng thừa kế và phần thừa kế bắt buộc.' },
    en: { title: 'Inheritance rights', excerpt: 'Intestate and testamentary succession, statutory classes of heirs, and the compulsory share.' },
    outline: [
      { vi: 'Thừa kế theo pháp luật', en: 'Intestate succession' },
      { vi: 'Di chúc và thừa kế theo di chúc', en: 'Wills and testamentary succession' },
      { vi: 'Phần thừa kế bắt buộc', en: 'The compulsory share' },
    ],
  },
  {
    slug: 'labor-rights',
    category: 'rights',
    vi: { title: 'Quyền của người lao động', excerpt: 'Hợp đồng lao động, mức lương tối thiểu, thời giờ làm việc, thai sản và bảo hiểm xã hội.' },
    en: { title: 'Workers\' rights', excerpt: 'Labor contracts, minimum wage, working hours, maternity, and social insurance.' },
    outline: [
      { vi: 'Hợp đồng lao động', en: 'Labor contract' },
      { vi: 'Lương và giờ làm việc', en: 'Wage and working hours' },
      { vi: 'Bảo hiểm xã hội', en: 'Social insurance' },
    ],
  },
  {
    slug: 'consumer-rights',
    category: 'rights',
    vi: { title: 'Quyền của người tiêu dùng', excerpt: 'Bảo hộ quyền lợi người tiêu dùng và cách phản ánh, khiếu nại hiệu quả.' },
    en: { title: 'Consumer rights', excerpt: 'How consumer protection works and how to file an effective complaint.' },
    outline: [
      { vi: 'Nguyên tắc bảo hộ', en: 'Protection principles' },
      { vi: 'Kênh khiếu nại', en: 'Complaint channels' },
      { vi: 'Bồi thường và xử phạt', en: 'Compensation and penalties' },
    ],
  },
  {
    slug: 'foreigner-rights',
    category: 'rights',
    vi: { title: 'Quyền của người nước ngoài', excerpt: 'Cư trú, lao động, sở hữu nhà, tiếp cận tư pháp và giới hạn áp dụng cho người nước ngoài tại Việt Nam.' },
    en: { title: 'Rights of foreign nationals', excerpt: 'Residence, employment, housing ownership, access to justice, and applicable limits for foreigners in Vietnam.' },
    outline: [
      { vi: 'Cư trú và thị thực', en: 'Residence and visas' },
      { vi: 'Lao động và sở hữu', en: 'Employment and ownership' },
      { vi: 'Tiếp cận tư pháp', en: 'Access to justice' },
    ],
  },
  {
    slug: 'complaint-and-denunciation',
    category: 'rights',
    vi: { title: 'Khiếu nại và tố cáo', excerpt: 'Phân biệt hai cơ chế, thủ tục gửi và cơ quan có thẩm quyền giải quyết.' },
    en: { title: 'Complaint and denunciation', excerpt: 'The distinction between the two mechanisms, how to file each, and the authorities responsible.' },
    outline: [
      { vi: 'Khiếu nại — cơ chế', en: 'Complaint — the mechanism' },
      { vi: 'Tố cáo — cơ chế', en: 'Denunciation — the mechanism' },
      { vi: 'Thủ tục và thời hạn', en: 'Procedure and time limits' },
    ],
  },

  // ─── Terminology (8 landing pages) ───────────────────────────────────
  {
    slug: 'civil-procedure-terminology',
    category: 'terminology',
    vi: { title: 'Thuật ngữ tố tụng dân sự', excerpt: 'Tập hợp các thuật ngữ chủ chốt trong tố tụng dân sự Việt Nam và cách dịch sát nghĩa.' },
    en: { title: 'Civil procedure terminology', excerpt: 'Key terms used in Vietnamese civil procedure with accurate English renderings.' },
    outline: [
      { vi: 'Các thuật ngữ cốt lõi', en: 'Core terms' },
      { vi: 'Thuật ngữ về đương sự', en: 'Terms for parties' },
      { vi: 'Thuật ngữ về chứng cứ', en: 'Terms for evidence' },
    ],
  },
  {
    slug: 'criminal-procedure-terminology',
    category: 'terminology',
    vi: { title: 'Thuật ngữ tố tụng hình sự', excerpt: 'Từ vựng cốt lõi trong tố tụng hình sự: điều tra, truy tố, xét xử.' },
    en: { title: 'Criminal procedure terminology', excerpt: 'Core criminal-procedure vocabulary: investigation, prosecution, trial.' },
    outline: [
      { vi: 'Giai đoạn điều tra', en: 'Investigation phase' },
      { vi: 'Giai đoạn truy tố', en: 'Prosecution phase' },
      { vi: 'Giai đoạn xét xử', en: 'Trial phase' },
    ],
  },
  {
    slug: 'corporate-terminology',
    category: 'terminology',
    vi: { title: 'Thuật ngữ doanh nghiệp', excerpt: 'Các thuật ngữ cốt lõi về loại hình doanh nghiệp, vốn, cổ đông và quản trị.' },
    en: { title: 'Corporate terminology', excerpt: 'Core vocabulary for company forms, capital, shareholders, and governance.' },
    outline: [
      { vi: 'Loại hình doanh nghiệp', en: 'Company forms' },
      { vi: 'Vốn và cổ đông', en: 'Capital and shareholders' },
      { vi: 'Quản trị', en: 'Governance' },
    ],
  },
  {
    slug: 'land-law-terminology',
    category: 'terminology',
    vi: { title: 'Thuật ngữ pháp luật đất đai', excerpt: 'Quyền sử dụng đất, giấy chứng nhận, mục đích sử dụng và các thuật ngữ chuyên ngành.' },
    en: { title: 'Land law terminology', excerpt: 'Land-use rights, certificates, use purposes, and specialised vocabulary.' },
    outline: [
      { vi: 'Quyền sử dụng đất', en: 'Land-use rights' },
      { vi: 'Giấy tờ về đất', en: 'Land documents' },
      { vi: 'Mục đích sử dụng', en: 'Use purposes' },
    ],
  },
  {
    slug: 'family-law-terminology',
    category: 'terminology',
    vi: { title: 'Thuật ngữ hôn nhân và gia đình', excerpt: 'Các thuật ngữ trong kết hôn, ly hôn, nuôi con và tài sản chung, tài sản riêng.' },
    en: { title: 'Family law terminology', excerpt: 'Terms for marriage, divorce, custody, and common vs. separate property.' },
    outline: [
      { vi: 'Kết hôn và ly hôn', en: 'Marriage and divorce' },
      { vi: 'Nuôi con và cấp dưỡng', en: 'Custody and support' },
      { vi: 'Tài sản chung, riêng', en: 'Common and separate property' },
    ],
  },
  {
    slug: 'labor-law-terminology',
    category: 'terminology',
    vi: { title: 'Thuật ngữ pháp luật lao động', excerpt: 'Hợp đồng, lương, thời giờ làm việc, chấm dứt và bảo hiểm — từ vựng cốt lõi.' },
    en: { title: 'Labor law terminology', excerpt: 'Contract, wage, working hours, termination, and social insurance — the core vocabulary.' },
    outline: [
      { vi: 'Hợp đồng lao động', en: 'Labor contract' },
      { vi: 'Lương và bảo hiểm', en: 'Wages and insurance' },
      { vi: 'Chấm dứt hợp đồng', en: 'Termination' },
    ],
  },
  {
    slug: 'commercial-terminology',
    category: 'terminology',
    vi: { title: 'Thuật ngữ thương mại', excerpt: 'Mua bán, đại lý, phân phối, nhượng quyền và các thuật ngữ thương mại phổ biến.' },
    en: { title: 'Commercial terminology', excerpt: 'Sale, agency, distribution, franchising, and other common commercial terms.' },
    outline: [
      { vi: 'Mua bán hàng hoá', en: 'Sale of goods' },
      { vi: 'Đại lý và phân phối', en: 'Agency and distribution' },
      { vi: 'Nhượng quyền thương mại', en: 'Franchising' },
    ],
  },
  {
    slug: 'administrative-terminology',
    category: 'terminology',
    vi: { title: 'Thuật ngữ hành chính', excerpt: 'Các thuật ngữ cốt lõi trong thủ tục hành chính và quản lý nhà nước.' },
    en: { title: 'Administrative terminology', excerpt: 'Core vocabulary for administrative procedures and public administration.' },
    outline: [
      { vi: 'Quyết định hành chính', en: 'Administrative decisions' },
      { vi: 'Thủ tục hành chính', en: 'Administrative procedures' },
      { vi: 'Xử phạt vi phạm hành chính', en: 'Administrative penalties' },
    ],
  },

  // ─── FAQ (6) ──────────────────────────────────────────────────────────
  {
    slug: 'when-to-hire-lawyer',
    category: 'faq',
    vi: { title: 'Khi nào nên thuê luật sư?', excerpt: 'Các tình huống phổ biến khi tự làm không đủ và chi phí thuê luật sư có thể tiết kiệm về lâu dài.' },
    en: { title: 'When should I hire a lawyer?', excerpt: 'Common situations where self-representation is insufficient and counsel pays for itself.' },
    outline: [
      { vi: 'Các tình huống điển hình', en: 'Typical situations' },
      { vi: 'Khi tự làm là đủ', en: 'When self-representation is enough' },
      { vi: 'Cách chọn luật sư phù hợp', en: 'How to pick the right lawyer' },
    ],
  },
  {
    slug: 'litigation-costs',
    category: 'faq',
    vi: { title: 'Chi phí khởi kiện và theo đuổi vụ án', excerpt: 'Án phí, tạm ứng, phí luật sư và các chi phí phụ trợ điển hình.' },
    en: { title: 'Litigation costs', excerpt: 'Court fees, advances, counsel fees, and typical ancillary costs.' },
    outline: [
      { vi: 'Án phí', en: 'Court fees' },
      { vi: 'Phí luật sư', en: 'Counsel fees' },
      { vi: 'Các chi phí khác', en: 'Other costs' },
    ],
  },
  {
    slug: 'statutes-of-limitation',
    category: 'faq',
    vi: { title: 'Thời hiệu trong pháp luật Việt Nam', excerpt: 'Khái quát về thời hiệu khởi kiện, thời hiệu kháng cáo và thời hiệu thi hành án.' },
    en: { title: 'Statutes of limitation in Vietnamese law', excerpt: 'Overview of time limits for filing, appealing, and enforcing judgments.' },
    outline: [
      { vi: 'Thời hiệu khởi kiện', en: 'Time limit to file' },
      { vi: 'Thời hiệu kháng cáo', en: 'Time limit to appeal' },
      { vi: 'Thời hiệu thi hành án', en: 'Time limit to enforce' },
    ],
  },
  {
    slug: 'detention-rights',
    category: 'faq',
    vi: { title: 'Quyền khi bị tạm giữ, tạm giam', excerpt: 'Các quyền cơ bản của người bị tạm giữ, tạm giam và vai trò của luật sư bào chữa.' },
    en: { title: 'Rights in custody and detention', excerpt: 'Basic rights of people in custody or detention and the role of defence counsel.' },
    outline: [
      { vi: 'Quyền được thông báo', en: 'Right to notification' },
      { vi: 'Quyền có luật sư', en: 'Right to counsel' },
      { vi: 'Khiếu nại về điều kiện giam giữ', en: 'Complaints about conditions' },
    ],
  },
  {
    slug: 'legal-aid',
    category: 'faq',
    vi: { title: 'Trợ giúp pháp lý miễn phí', excerpt: 'Đối tượng được trợ giúp pháp lý, cơ quan cung cấp và cách yêu cầu.' },
    en: { title: 'Free legal aid', excerpt: 'Who qualifies for legal aid, which bodies provide it, and how to request it.' },
    outline: [
      { vi: 'Đối tượng', en: 'Who qualifies' },
      { vi: 'Cơ quan trợ giúp', en: 'Legal-aid bodies' },
      { vi: 'Quy trình yêu cầu', en: 'Request procedure' },
    ],
  },
  {
    slug: 'notarization',
    category: 'faq',
    vi: { title: 'Công chứng và chứng thực', excerpt: 'Phân biệt công chứng và chứng thực, giá trị pháp lý và trường hợp bắt buộc.' },
    en: { title: 'Notarization and authentication', excerpt: 'Distinguishing notarization from authentication, their legal force, and when each is mandatory.' },
    outline: [
      { vi: 'Công chứng', en: 'Notarization' },
      { vi: 'Chứng thực', en: 'Authentication' },
      { vi: 'Trường hợp bắt buộc', en: 'When either is mandatory' },
    ],
  },
]
