/* Recent Vietnamese legal updates — pulled verbatim from thuvienphapluat.vn (which mirrors the
 * official Cổng VBPL data) on 2026-04-27. Titles are NOT paraphrased; English titles are literal
 * translations of the Vietnamese title only. No editorial summary is added — readers must click the
 * source link for the binding text.
 *
 * To refresh: re-run scripts/refresh-updates.mjs (TODO) or update this list manually.
 */

export type InstrumentType =
  | 'law' // Luật
  | 'code' // Bộ luật
  | 'decree' // Nghị định
  | 'circular' // Thông tư
  | 'resolution' // Nghị quyết
  | 'decision' // Quyết định
  | 'directive' // Chỉ thị
  | 'dispatch' // Công văn
  | 'standard' // QCVN / TCVN
  | 'consolidation' // Văn bản hợp nhất
  | 'draft' // Dự thảo

export interface LegalUpdate {
  id: string
  type: InstrumentType
  number: string
  title: { vi: string; en: string }
  issuedDate: string // YYYY-MM-DD
  issuingBody: { vi: string; en: string }
  area: string // tag for filtering — derived from thuvienphapluat URL path segment
  sourceUrl: string // thuvienphapluat.vn detail-page URL (mirrors vbpl.vn data)
}

const TYPE_LABELS: Record<InstrumentType, { vi: string; en: string }> = {
  law: { vi: 'Luật', en: 'Law' },
  code: { vi: 'Bộ luật', en: 'Code' },
  decree: { vi: 'Nghị định', en: 'Decree' },
  circular: { vi: 'Thông tư', en: 'Circular' },
  resolution: { vi: 'Nghị quyết', en: 'Resolution' },
  decision: { vi: 'Quyết định', en: 'Decision' },
  directive: { vi: 'Chỉ thị', en: 'Directive' },
  dispatch: { vi: 'Công văn', en: 'Official letter' },
  standard: { vi: 'Quy chuẩn / Tiêu chuẩn', en: 'Technical standard' },
  consolidation: { vi: 'Văn bản hợp nhất', en: 'Consolidated text' },
  draft: { vi: 'Dự thảo', en: 'Draft' },
}

export function getTypeLabel(type: InstrumentType, locale: 'vi' | 'en') {
  return TYPE_LABELS[type][locale]
}

const AREA_LABELS: Record<string, { vi: string; en: string }> = {
  investment: { vi: 'Đầu tư', en: 'Investment' },
  transport: { vi: 'Giao thông', en: 'Transport' },
  health: { vi: 'Y tế', en: 'Health' },
  education: { vi: 'Giáo dục', en: 'Education' },
  environment: { vi: 'Môi trường', en: 'Environment' },
  admin: { vi: 'Hành chính', en: 'Administrative' },
  ip: { vi: 'Sở hữu trí tuệ', en: 'Intellectual property' },
  construction: { vi: 'Xây dựng', en: 'Construction' },
  commerce: { vi: 'Thương mại', en: 'Commerce' },
  insurance: { vi: 'Bảo hiểm', en: 'Insurance' },
  it: { vi: 'Công nghệ', en: 'Technology' },
  finance: { vi: 'Tài chính', en: 'Finance' },
}

export function getAreaLabel(area: string, locale: 'vi' | 'en') {
  return AREA_LABELS[area]?.[locale] ?? area
}

/* SEED CORPUS — pulled 2026-04-27 from thuvienphapluat.vn newest-documents listing.
 * Sorted by issuedDate descending. Titles verbatim. Do not paraphrase.
 * Source: https://thuvienphapluat.vn/ (mirror of Cổng VBPL — vbpl.vn) */
export const LEGAL_UPDATES: LegalUpdate[] = [
  {
    id: 'nd-103-2026',
    type: 'decree',
    number: '103/2026/NĐ-CP',
    title: {
      vi: 'Nghị định 103/2026/NĐ-CP quy định về đầu tư ra nước ngoài',
      en: 'Decree 103/2026/NĐ-CP on outbound investment',
    },
    issuedDate: '2026-04-25',
    issuingBody: { vi: 'Chính phủ', en: 'Government' },
    area: 'investment',
    sourceUrl:
      'https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-103-2026-ND-CP-dau-tu-ra-nuoc-ngoai-453878.aspx',
  },
  {
    id: 'nq-113-2026',
    type: 'resolution',
    number: '113/NQ-CP',
    title: {
      vi: 'Nghị quyết 113/NQ-CP năm 2026 thanh toán chi phí khám bệnh bảo hiểm y tế',
      en: 'Resolution 113/NQ-CP (2026) on settlement of medical-examination costs under health insurance',
    },
    issuedDate: '2026-04-25',
    issuingBody: { vi: 'Chính phủ', en: 'Government' },
    area: 'insurance',
    sourceUrl:
      'https://thuvienphapluat.vn/van-ban/Bao-hiem/Nghi-quyet-113-NQ-CP-2026-thanh-toan-chi-phi-kham-benh-bao-hiem-y-te-vuot-du-toan-703562.aspx',
  },
  {
    id: 'ct-09-bct-2026',
    type: 'directive',
    number: '09/CT-BCT',
    title: {
      vi: 'Chỉ thị 09/CT-BCT tăng cường phòng chống thiên tai ngành Công Thương năm 2026',
      en: 'Directive 09/CT-BCT (2026) on strengthening disaster-prevention work in the Industry & Trade sector',
    },
    issuedDate: '2026-04-24',
    issuingBody: { vi: 'Bộ Công Thương', en: 'Ministry of Industry and Trade' },
    area: 'environment',
    sourceUrl:
      'https://thuvienphapluat.vn/van-ban/Tai-nguyen-Moi-truong/Chi-thi-09-CT-BCT-2026-tang-cuong-cong-tac-phong-chong-thien-tai-nganh-Cong-Thuong-703345.aspx',
  },
  {
    id: 'qd-2005-bqp-2026',
    type: 'decision',
    number: '2005/QĐ-BQP',
    title: {
      vi: 'Quyết định 2005/QĐ-BQP năm 2026 công bố thủ tục hành chính lĩnh vực Mật mã dân sự',
      en: 'Decision 2005/QĐ-BQP (2026) publishing administrative procedures in the field of civil cryptography',
    },
    issuedDate: '2026-04-24',
    issuingBody: { vi: 'Bộ Quốc phòng', en: 'Ministry of National Defence' },
    area: 'admin',
    sourceUrl:
      'https://thuvienphapluat.vn/van-ban/Bo-may-hanh-chinh/Quyet-dinh-2005-QD-BQP-2026-cong-bo-thu-tuc-hanh-chinh-sua-doi-linh-vuc-mat-ma-dan-su-703530.aspx',
  },
  {
    id: 'vbhn-04-bgddt-2026',
    type: 'consolidation',
    number: '04/VBHN-BGDĐT',
    title: {
      vi: 'Văn bản hợp nhất 04/VBHN-BGDĐT năm 2026 hợp nhất Thông tư dạy thêm học thêm',
      en: 'Consolidated text 04/VBHN-BGDĐT (2026) consolidating circulars on extra-class teaching and learning',
    },
    issuedDate: '2026-04-24',
    issuingBody: { vi: 'Bộ Giáo dục và Đào tạo', en: 'Ministry of Education and Training' },
    area: 'education',
    sourceUrl:
      'https://thuvienphapluat.vn/van-ban/Giao-duc/Van-ban-hop-nhat-04-VBHN-BGDDT-2026-Thong-tu-quy-dinh-day-them-hoc-them-703379.aspx',
  },
  {
    id: 'cv-15662-chq-2026',
    type: 'dispatch',
    number: '15662/CHQ-GSQL',
    title: {
      vi: 'Công văn 15662/CHQ-GSQL năm 2026 vướng mắc sở hữu trí tuệ và ghi nhãn',
      en: 'Official letter 15662/CHQ-GSQL (2026) on intellectual-property and labelling difficulties',
    },
    issuedDate: '2026-04-24',
    issuingBody: { vi: 'Cục Hải quan', en: 'General Department of Customs' },
    area: 'ip',
    sourceUrl:
      'https://thuvienphapluat.vn/cong-van/So-huu-tri-tue/Cong-van-15662-CHQ-GSQL-2026-giai-dap-so-huu-tri-tue-va-ghi-nhan-san-pham-703344.aspx',
  },
  {
    id: 'cv-2989-byt-2026',
    type: 'dispatch',
    number: '2989/BYT-KCB',
    title: {
      vi: 'Công văn 2989/BYT-KCB năm 2026 bảo đảm công tác khám chữa bệnh dịp nghỉ lễ',
      en: 'Official letter 2989/BYT-KCB (2026) on ensuring medical examination and treatment work during the public-holiday period',
    },
    issuedDate: '2026-04-24',
    issuingBody: { vi: 'Bộ Y tế', en: 'Ministry of Health' },
    area: 'health',
    sourceUrl:
      'https://thuvienphapluat.vn/cong-van/The-thao-Y-te/Cong-van-2989-BYT-KCB-2026-bao-dam-cong-tac-kham-chua-benh-dip-nghi-le-30-4-703486.aspx',
  },
  {
    id: 'ct-16-ttg-2026',
    type: 'directive',
    number: '16/CT-TTg',
    title: {
      vi: 'Chỉ thị 16/CT-TTg năm 2026 về quản lý và sử dụng vốn đầu tư công gắn với hạch toán kinh tế - xã hội',
      en: 'Directive 16/CT-TTg (2026) on the management and use of public investment capital linked to socio-economic accounting',
    },
    issuedDate: '2026-04-23',
    issuingBody: { vi: 'Thủ tướng Chính phủ', en: 'Prime Minister' },
    area: 'finance',
    sourceUrl:
      'https://thuvienphapluat.vn/van-ban/Dau-tu/Chi-thi-16-CT-TTg-2026-quan-ly-von-dau-tu-cong-gan-voi-hach-toan-kinh-te-xa-hoi-703388.aspx',
  },
  {
    id: 'cv-2137-bgddt-2026',
    type: 'dispatch',
    number: '2137/BGDĐT-QLCL',
    title: {
      vi: 'Công văn 2137/BGDĐT-QLCL năm 2026 điều chỉnh Kỳ thi tốt nghiệp',
      en: 'Official letter 2137/BGDĐT-QLCL (2026) on adjustments to the high-school graduation examination',
    },
    issuedDate: '2026-04-23',
    issuingBody: { vi: 'Bộ Giáo dục và Đào tạo', en: 'Ministry of Education and Training' },
    area: 'education',
    sourceUrl:
      'https://thuvienphapluat.vn/cong-van/Giao-duc/Cong-van-2137-BGDDT-QLCL-2026-dieu-chinh-ke-hoach-kiem-tra-Ky-thi-tot-nghiep-trung-hoc-pho-thong-703276.aspx',
  },
  {
    id: 'cv-2844-bct-2026',
    type: 'dispatch',
    number: '2844/BCT-TTTN',
    title: {
      vi: 'Công văn 2844/BCT-TTTN năm 2026 điều hành giá bán xăng dầu',
      en: 'Official letter 2844/BCT-TTTN (2026) on petroleum-pricing management',
    },
    issuedDate: '2026-04-23',
    issuingBody: { vi: 'Bộ Công Thương', en: 'Ministry of Industry and Trade' },
    area: 'commerce',
    sourceUrl:
      'https://thuvienphapluat.vn/cong-van/Thuong-mai/Cong-van-2844-BCT-TTTN-2026-thong-bao-dieu-hanh-gia-ban-xang-dau-703257.aspx',
  },
  {
    id: 'ct-14-ttg-2026',
    type: 'directive',
    number: '14/CT-TTg',
    title: {
      vi: 'Chỉ thị 14/CT-TTg năm 2026 đẩy mạnh bồi dưỡng và đánh giá kiến thức, kỹ năng số',
      en: 'Directive 14/CT-TTg (2026) on strengthening training and assessment of digital knowledge and skills',
    },
    issuedDate: '2026-04-22',
    issuingBody: { vi: 'Thủ tướng Chính phủ', en: 'Prime Minister' },
    area: 'it',
    sourceUrl:
      'https://thuvienphapluat.vn/van-ban/Cong-nghe-thong-tin/Chi-thi-14-CT-TTg-2026-day-manh-boi-duong-ky-nang-so-doi-voi-can-bo-cong-chuc-vien-chuc-703065.aspx',
  },
  {
    id: 'ct-3952-bnnmt-2026',
    type: 'directive',
    number: '3952/CT-BNNMT',
    title: {
      vi: 'Chỉ thị 3952/CT-BNNMT tăng cường công tác đảm bảo an toàn công trình đê điều năm 2026',
      en: 'Directive 3952/CT-BNNMT (2026) on strengthening dyke-works safety',
    },
    issuedDate: '2026-04-22',
    issuingBody: { vi: 'Bộ Nông nghiệp và Môi trường', en: 'Ministry of Agriculture and Environment' },
    area: 'environment',
    sourceUrl:
      'https://thuvienphapluat.vn/van-ban/Tai-nguyen-Moi-truong/Chi-thi-3952-CT-BNNMT-2026-tang-cuong-dam-bao-an-toan-cong-trinh-de-dieu-mua-mua-lu-703274.aspx',
  },
  {
    id: 'ct-13-ttg-2026',
    type: 'directive',
    number: '13/CT-TTg',
    title: {
      vi: 'Chỉ thị 13/CT-TTg năm 2026 tập trung phát triển, ứng dụng công nghệ sinh học',
      en: 'Directive 13/CT-TTg (2026) on focused development and application of biotechnology',
    },
    issuedDate: '2026-04-21',
    issuingBody: { vi: 'Thủ tướng Chính phủ', en: 'Prime Minister' },
    area: 'environment',
    sourceUrl:
      'https://thuvienphapluat.vn/van-ban/Tai-nguyen-Moi-truong/Chi-thi-13-CT-TTg-2026-ung-dung-hieu-qua-cong-nghe-sinh-hoc-trong-san-xuat-va-doi-song-703064.aspx',
  },
  {
    id: 'qcvn-31-2026',
    type: 'standard',
    number: 'QCVN 31:2026/BXD',
    title: {
      vi: 'QCVN 31:2026/BXD về Ắc quy sử dụng xe mô tô điện, xe gắn máy điện',
      en: 'National technical regulation QCVN 31:2026/BXD on batteries used in electric motorcycles and electric mopeds',
    },
    issuedDate: '2026-04-09',
    issuingBody: { vi: 'Bộ Xây dựng', en: 'Ministry of Construction' },
    area: 'transport',
    sourceUrl:
      'https://thuvienphapluat.vn/TCVN/Giao-thong/QCVN-31-2026-BXD-Ac-quy-su-dung-cho-xe-mo-to-dien-xe-gan-may-dien-922344.aspx',
  },
  {
    id: 'qcvn-30-2026',
    type: 'standard',
    number: 'QCVN 30:2026/BXD',
    title: {
      vi: 'QCVN 30:2026/BXD về Động cơ sử dụng xe mô tô điện, xe gắn máy điện',
      en: 'National technical regulation QCVN 30:2026/BXD on motors used in electric motorcycles and electric mopeds',
    },
    issuedDate: '2026-04-09',
    issuingBody: { vi: 'Bộ Xây dựng', en: 'Ministry of Construction' },
    area: 'transport',
    sourceUrl:
      'https://thuvienphapluat.vn/TCVN/Giao-thong/QCVN-30-2026-BXD-Dong-co-su-dung-cho-xe-mo-to-dien-xe-gan-may-dien-922343.aspx',
  },
  {
    id: 'nd-136-2026',
    type: 'decree',
    number: '136/2026/NĐ-CP',
    title: {
      vi: 'Nghị định 136/2026/NĐ-CP sửa đổi hướng dẫn Luật Nhà ở phát triển nhà ở xã hội',
      en: 'Decree 136/2026/NĐ-CP amending guidance on the Law on Housing concerning social-housing development',
    },
    issuedDate: '2026-04-07',
    issuingBody: { vi: 'Chính phủ', en: 'Government' },
    area: 'construction',
    sourceUrl:
      'https://thuvienphapluat.vn/van-ban/Xay-dung-Do-thi/Nghi-dinh-136-2026-ND-CP-sua-doi-Nghi-dinh-100-2024-ND-CP-huong-dan-Luat-Nha-o-700596.aspx',
  },
  {
    id: 'nq-16-2026',
    type: 'resolution',
    number: '16/2026/NQ-CP',
    title: {
      vi: 'Nghị quyết 16/2026/NQ-CP chính sách tháo gỡ dự án Xây dựng - Chuyển giao',
      en: 'Resolution 16/2026/NQ-CP on policies to unblock Build-Transfer projects',
    },
    issuedDate: '2026-04-07',
    issuingBody: { vi: 'Chính phủ', en: 'Government' },
    area: 'investment',
    sourceUrl:
      'https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-quyet-16-2026-NQ-CP-chinh-sach-thao-go-kho-khan-du-an-dau-tu-Xay-dung-Chuyen-giao-700616.aspx',
  },
  {
    id: 'tt-20-bgddt-2026',
    type: 'circular',
    number: '20/2026/TT-BGDĐT',
    title: {
      vi: 'Thông tư 20/2026/TT-BGDĐT quy định kiểm định chất lượng cơ sở giáo dục đại học',
      en: 'Circular 20/2026/TT-BGDĐT on quality accreditation of higher-education institutions',
    },
    issuedDate: '2026-04-01',
    issuingBody: { vi: 'Bộ Giáo dục và Đào tạo', en: 'Ministry of Education and Training' },
    area: 'education',
    sourceUrl:
      'https://thuvienphapluat.vn/van-ban/Giao-duc/Thong-tu-20-2026-TT-BGDDT-kiem-dinh-chat-luong-co-so-giao-duc-dai-hoc-335300.aspx',
  },
  {
    id: 'tt-06-byt-2026',
    type: 'circular',
    number: '06/2026/TT-BYT',
    title: {
      vi: 'Thông tư 06/2026/TT-BYT mã hóa bệnh tật theo ICD-10',
      en: 'Circular 06/2026/TT-BYT on disease-coding under ICD-10',
    },
    issuedDate: '2026-04-01',
    issuingBody: { vi: 'Bộ Y tế', en: 'Ministry of Health' },
    area: 'health',
    sourceUrl:
      'https://thuvienphapluat.vn/van-ban/The-thao-Y-te/Thong-tu-06-2026-TT-BYT-ma-hoa-benh-tat-nguyen-nhan-tu-vong-theo-ICD-10-562759.aspx',
  },
  {
    id: 'nd-89-2026',
    type: 'decree',
    number: '89/2026/NĐ-CP',
    title: {
      vi: 'Nghị định 89/2026/NĐ-CP quy định về điều kiện kinh doanh dịch vụ kiểm định xe cơ giới',
      en: 'Decree 89/2026/NĐ-CP on the business conditions for motor-vehicle inspection services',
    },
    issuedDate: '2026-03-30',
    issuingBody: { vi: 'Chính phủ', en: 'Government' },
    area: 'transport',
    sourceUrl:
      'https://thuvienphapluat.vn/van-ban/Giao-thong-Van-tai/Nghi-dinh-89-2026-ND-CP-dieu-kien-kinh-doanh-dich-vu-kiem-dinh-xe-co-gioi-688213.aspx',
  },
  {
    id: 'nd-94-2026',
    type: 'decree',
    number: '94/2026/NĐ-CP',
    title: {
      vi: 'Nghị định 94/2026/NĐ-CP quy định về hoạt động đào tạo và sát hạch lái xe',
      en: 'Decree 94/2026/NĐ-CP on driver-training and driving-test activities',
    },
    issuedDate: '2026-03-31',
    issuingBody: { vi: 'Chính phủ', en: 'Government' },
    area: 'transport',
    sourceUrl:
      'https://thuvienphapluat.vn/van-ban/Giao-thong-Van-tai/Nghi-dinh-94-2026-ND-CP-quy-dinh-hoat-dong-dao-tao-va-sat-hach-lai-xe-699636.aspx',
  },
  {
    id: 'nd-96-2026',
    type: 'decree',
    number: '96/2026/NĐ-CP',
    title: {
      vi: 'Nghị định 96/2026/NĐ-CP hướng dẫn Luật Đầu tư',
      en: 'Decree 96/2026/NĐ-CP providing guidance on the Law on Investment',
    },
    issuedDate: '2026-03-31',
    issuingBody: { vi: 'Chính phủ', en: 'Government' },
    area: 'investment',
    sourceUrl:
      'https://thuvienphapluat.vn/van-ban/Dau-tu/Nghi-dinh-96-2026-ND-CP-huong-dan-Luat-Dau-tu-690303.aspx',
  },
]

/* Filter chips for the UI. */
export const UPDATE_AREAS = [
  { key: 'all', label: { vi: 'Tất cả lĩnh vực', en: 'All areas' } },
  { key: 'investment', label: { vi: 'Đầu tư', en: 'Investment' } },
  { key: 'transport', label: { vi: 'Giao thông', en: 'Transport' } },
  { key: 'health', label: { vi: 'Y tế', en: 'Health' } },
  { key: 'education', label: { vi: 'Giáo dục', en: 'Education' } },
  { key: 'environment', label: { vi: 'Môi trường', en: 'Environment' } },
  { key: 'admin', label: { vi: 'Hành chính', en: 'Administrative' } },
  { key: 'construction', label: { vi: 'Xây dựng', en: 'Construction' } },
  { key: 'commerce', label: { vi: 'Thương mại', en: 'Commerce' } },
  { key: 'finance', label: { vi: 'Tài chính', en: 'Finance' } },
  { key: 'it', label: { vi: 'Công nghệ', en: 'Technology' } },
  { key: 'insurance', label: { vi: 'Bảo hiểm', en: 'Insurance' } },
  { key: 'ip', label: { vi: 'Sở hữu trí tuệ', en: 'IP' } },
] as const

export const UPDATE_TYPES = [
  { key: 'all', label: { vi: 'Tất cả loại', en: 'All types' } },
  { key: 'law', label: { vi: 'Luật', en: 'Law' } },
  { key: 'decree', label: { vi: 'Nghị định', en: 'Decree' } },
  { key: 'circular', label: { vi: 'Thông tư', en: 'Circular' } },
  { key: 'resolution', label: { vi: 'Nghị quyết', en: 'Resolution' } },
  { key: 'decision', label: { vi: 'Quyết định', en: 'Decision' } },
  { key: 'directive', label: { vi: 'Chỉ thị', en: 'Directive' } },
  { key: 'dispatch', label: { vi: 'Công văn', en: 'Official letter' } },
  { key: 'standard', label: { vi: 'Quy chuẩn', en: 'Technical standard' } },
  { key: 'consolidation', label: { vi: 'Văn bản hợp nhất', en: 'Consolidated' } },
] as const
