/* Reusable narrative bank for the SEO-content generator. Bilingual.
 * The generator picks per-section paragraphs, weaves in topic-specific terms,
 * and produces ~700-900 word bodies per article.
 */

export const FRAMEWORK_REFS = {
  vi: [
    'Hiến pháp 2013',
    'Bộ luật Dân sự 2015',
    'Bộ luật Tố tụng Dân sự 2015',
    'Bộ luật Hình sự 2015 (sửa đổi 2017)',
    'Bộ luật Tố tụng Hình sự 2015',
    'Luật Tổ chức Tòa án nhân dân 2014',
    'Luật Tổ chức Viện kiểm sát nhân dân 2014',
    'Luật Đất đai 2013',
    'Luật Doanh nghiệp 2020',
    'Luật Lao động 2019',
    'Luật Hôn nhân và Gia đình 2014',
    'Luật Khiếu nại 2011',
    'Luật Tố cáo 2018',
  ],
  en: [
    'the 2013 Constitution',
    'the 2015 Civil Code',
    'the 2015 Civil Procedure Code',
    'the 2015 Criminal Code (as amended in 2017)',
    'the 2015 Criminal Procedure Code',
    'the 2014 Law on Court Organisation',
    'the 2014 Law on the People\'s Procuracy',
    'the 2013 Land Law',
    'the 2020 Enterprise Law',
    'the 2019 Labor Code',
    'the 2014 Law on Marriage and the Family',
    'the 2011 Law on Complaints',
    'the 2018 Law on Denunciations',
  ],
}

/* Pull quotes used as mid-article aphorisms when a topic has no custom one. */
export const DEFAULT_PULL_QUOTES = {
  vi: [
    {
      quote: 'Nước Cộng hòa xã hội chủ nghĩa Việt Nam là Nhà nước pháp quyền xã hội chủ nghĩa của Nhân dân, do Nhân dân, vì Nhân dân.',
      attribution: 'Hiến pháp 2013, Điều 2',
    },
    {
      quote: 'Mọi người đều bình đẳng trước pháp luật.',
      attribution: 'Hiến pháp 2013, Điều 16',
    },
    {
      quote: 'Quyền con người, quyền công dân chỉ có thể bị hạn chế theo quy định của luật.',
      attribution: 'Hiến pháp 2013, Điều 14',
    },
  ],
  en: [
    {
      quote: 'The Socialist Republic of Vietnam is a socialist rule-of-law State of the People, by the People, and for the People.',
      attribution: '2013 Constitution, Article 2',
    },
    {
      quote: 'All persons are equal before the law.',
      attribution: '2013 Constitution, Article 16',
    },
    {
      quote: 'Human rights and citizen rights may only be restricted as prescribed by law.',
      attribution: '2013 Constitution, Article 14',
    },
  ],
}

/* Category-level intros that establish the framing of every article in the cluster. */
export const CATEGORY_FRAMES = {
  vi: {
    'legal-system':
      'Khi tiếp cận hệ thống pháp luật Việt Nam, bạn đọc cần hiểu rằng các nguồn luật được sắp xếp theo một trật tự thứ bậc rõ ràng — Hiến pháp đứng ở vị trí cao nhất, theo sau là các đạo luật do Quốc hội ban hành, rồi đến các văn bản dưới luật.',
    'court-system':
      'Hệ thống tài phán Việt Nam vận hành theo nguyên tắc "hai cấp xét xử" với bốn cấp tòa, đi kèm là Viện kiểm sát giữ chức năng công tố và giám sát hoạt động tư pháp.',
    litigation:
      'Tố tụng tại Việt Nam đề cao nguyên tắc thỏa thuận, hòa giải trước khi đưa vụ việc ra xét xử chính thức — một đặc điểm phản ánh truyền thống pháp lý dân luật.',
    rights:
      'Quyền con người và quyền công dân được công nhận, tôn trọng, bảo vệ và bảo đảm theo Hiến pháp và pháp luật — nhưng phạm vi của các quyền này được giới hạn theo quy định cụ thể.',
    terminology:
      'Thuật ngữ pháp lý không chỉ là từ ngữ — chúng là công cụ chính xác hóa khái niệm, đặc biệt cần thiết khi văn bản pháp luật được dịch sang ngôn ngữ khác.',
    faq:
      'Mặc dù bộ tri thức này không thay thế tư vấn cá nhân, các câu trả lời dưới đây phản ánh khung pháp lý hiện hành tại Việt Nam và thực tiễn áp dụng phổ biến.',
  },
  en: {
    'legal-system':
      "When approaching Vietnam's legal system, readers should recognise that sources of law are arranged in a clear hierarchy — the Constitution sits at the apex, followed by statutes enacted by the National Assembly, and then subordinate normative instruments.",
    'court-system':
      "Vietnam's adjudicative system operates on a two-tier review principle across four court levels, paired with the Procuracy, which discharges both prosecutorial and judicial-oversight functions.",
    litigation:
      'Vietnamese procedure emphasises consensual resolution and mediation before formal adjudication — a feature that reflects the underlying civil-law tradition.',
    rights:
      'Human rights and citizen rights are recognised, respected, protected, and guaranteed under the Constitution and statute — but the scope of those rights is delimited by specific legal provisions.',
    terminology:
      'Legal vocabulary is not merely linguistic — it is the precision instrument by which concepts are operationalised, and it becomes especially important when texts cross language boundaries.',
    faq:
      'While this encyclopedia is not a substitute for individualised counsel, the answers below reflect the prevailing legal framework in Vietnam and common application practice.',
  },
}

/* Section narrative templates — five variants rotated by section index for variety. */
export const SECTION_TEMPLATES = {
  vi: [
    {
      paraA: ({ section, topicTitle }) =>
        `${section} là khía cạnh đầu tiên cần làm rõ khi nghiên cứu ${topicTitle.toLowerCase()}. Trong khuôn khổ pháp luật Việt Nam, vấn đề này được điều chỉnh bởi nhiều văn bản quy phạm và cần được hiểu trong mối quan hệ tổng thể giữa Hiến pháp, các đạo luật chuyên ngành và văn bản dưới luật. Việc nắm vững nội dung của ${section.toLowerCase()} không chỉ phục vụ công tác nghiên cứu lý luận mà còn là điều kiện tiên quyết để áp dụng chính xác trong thực tiễn.`,
      paraB: ({ section, frame }) =>
        `Về mặt cấu trúc pháp lý, ${section.toLowerCase()} chịu sự điều chỉnh trực tiếp của ${frame}. Các quy định liên quan thường phân thành hai nhóm: nhóm quy phạm chung quy định nguyên tắc và phạm vi áp dụng, và nhóm quy phạm chi tiết quy định trình tự, thủ tục và hậu quả pháp lý. Trong nhiều trường hợp, các văn bản hướng dẫn cấp Bộ giúp cụ thể hóa cách áp dụng cho các tình huống điển hình mà luật chưa thể bao quát hết.`,
      paraC: ({ section }) =>
        `Trong thực tiễn, ${section.toLowerCase()} là điểm tham chiếu được các bên thường xuyên nhắc đến — từ luật sư, thẩm phán đến cán bộ hành chính. Những vướng mắc thường xuất phát không phải từ bản thân quy phạm mà từ cách áp dụng quy phạm vào tình huống cụ thể, đặc biệt khi các quy định mới ban hành chưa có án lệ hoặc hướng dẫn nội bộ rõ ràng.`,
    },
    {
      paraA: ({ section, topicTitle }) =>
        `Một thành tố không thể bỏ qua khi tiếp cận ${topicTitle.toLowerCase()} là ${section.toLowerCase()}. Phần này đề cập đến cấu trúc, chức năng và phạm vi của ${section.toLowerCase()} trong tổng thể hệ thống pháp luật. Cách hiểu đúng đắn về phần này giúp người đọc tránh được các nhầm lẫn phổ biến và xây dựng được nền tảng kiến thức vững chắc cho các vấn đề chuyên sâu hơn.`,
      paraB: ({ section, frame }) =>
        `${frame} đặt ra khung pháp lý cơ bản cho ${section.toLowerCase()}. Quy định trong văn bản này tương thích với các nguyên tắc chung của hệ thống dân luật mà Việt Nam theo truyền thống — đề cao tính rõ ràng của quy phạm thành văn, vai trò trung tâm của cơ quan lập pháp và sự bổ trợ có giới hạn của thực tiễn xét xử.`,
      paraC: ({ section, related }) =>
        `Khi áp dụng vào tình huống cụ thể, ${section.toLowerCase()} thường tương tác với các vấn đề ở các phần khác — chẳng hạn ${related}. Các thẩm phán, luật sư và nhà nghiên cứu cần xem xét toàn diện các vấn đề liên quan thay vì xử lý từng phần một cách biệt lập.`,
    },
    {
      paraA: ({ section }) =>
        `${section} đại diện cho một trong những trụ cột mà bạn đọc cần hiểu sâu. Nội dung của phần này liên quan đến cả khía cạnh quy phạm thuần túy và khía cạnh thực thi — tức là không chỉ "luật quy định gì" mà còn "luật được áp dụng như thế nào". Sự phân biệt này đặc biệt quan trọng trong môi trường pháp lý Việt Nam, nơi văn bản hướng dẫn và thực tiễn cơ quan có thẩm quyền đóng vai trò bổ trợ đáng kể.`,
      paraB: ({ section, frame }) =>
        `Khung pháp lý áp dụng cho ${section.toLowerCase()} chủ yếu nằm trong ${frame} cùng các nghị định, thông tư hướng dẫn liên quan. Đây là một mô hình quy phạm điển hình của hệ thống dân luật, trong đó các nguyên tắc trừu tượng được cụ thể hóa qua nhiều cấp văn bản dưới luật.`,
      paraC: ({ section }) =>
        `Ý nghĩa thực tiễn của ${section.toLowerCase()} thể hiện rõ ở các tình huống có yếu tố tranh chấp hoặc cần xác lập quyền và nghĩa vụ rõ ràng giữa các bên. Người tham gia quan hệ pháp luật cần xác định rõ vị thế pháp lý của mình trước khi đưa ra quyết định.`,
    },
  ],
  en: [
    {
      paraA: ({ section, topicTitle }) =>
        `${section} is the first dimension to clarify when studying ${topicTitle.toLowerCase()}. Within Vietnamese law, this question is governed by several layered instruments and must be read in the context of the overall hierarchy — the Constitution, specialised statutes, and subordinate normative documents. A firm grasp of ${section.toLowerCase()} is not merely an academic exercise; it is a precondition for accurate application in practice.`,
      paraB: ({ section, frame }) =>
        `From a structural standpoint, ${section.toLowerCase()} is governed primarily by ${frame}. The relevant provisions typically split into two categories: general norms that set out principles and scope of application, and detailed norms that prescribe procedure and legal consequences. Ministerial guidance often fills in the operational details for typical fact-patterns the statute itself cannot fully anticipate.`,
      paraC: ({ section }) =>
        `In practice, ${section.toLowerCase()} is a reference point lawyers, judges, and administrative officers return to repeatedly. Difficulties usually arise not from the norm itself but from how it applies to a specific situation — especially where recently-enacted provisions have not yet generated precedent or internal guidance.`,
    },
    {
      paraA: ({ section, topicTitle }) =>
        `An inseparable component of ${topicTitle.toLowerCase()} is ${section.toLowerCase()}. This section addresses the structure, function, and scope of ${section.toLowerCase()} within the wider legal system. Reading it correctly helps avoid common misconceptions and builds a stable foundation for the more specialised material that follows.`,
      paraB: ({ section, frame }) =>
        `${frame} sets out the basic legal framework for ${section.toLowerCase()}. Its provisions track the general principles of the civil-law tradition Vietnam follows — privileging the clarity of written norms, the central role of the legislature, and a supplementary (rather than constitutive) role for adjudicative practice.`,
      paraC: ({ section, related }) =>
        `When applied to concrete situations, ${section.toLowerCase()} interacts with other parts — for example, ${related}. Judges, counsel, and researchers must assess the related issues holistically rather than treating any one piece in isolation.`,
    },
    {
      paraA: ({ section }) =>
        `${section} represents one of the load-bearing pillars readers must internalise. The substance of this section combines pure-norm dimensions with enforcement dimensions — not just what the law says, but how it is applied. The distinction matters especially in Vietnam, where guidance documents and the established practice of competent authorities play a substantial supplementary role.`,
      paraB: ({ section, frame }) =>
        `The legal framework for ${section.toLowerCase()} sits primarily in ${frame}, complemented by implementing decrees and circulars. This is a typical normative pattern in the civil-law tradition: abstract principles are operationalised through multiple successive instruments below the statute.`,
      paraC: ({ section }) =>
        `The practical importance of ${section.toLowerCase()} comes through clearly when there is a dispute or where rights and obligations between parties need to be made determinate. Participants in the legal relationship must clarify their own legal position before making decisions.`,
    },
  ],
}

/* Lede paragraph templates (used as the opening that gets a drop cap). */
export const LEDE_TEMPLATES = {
  vi: ({ topicTitle, frame, categoryFrame }) =>
    `${categoryFrame} ${topicTitle} thuộc về phần nội dung này, và để hiểu đúng cần đặt nó trong bối cảnh ${frame} cùng hệ thống văn bản hướng dẫn áp dụng. Bài viết dưới đây trình bày các thành tố chính, phân tích cấu trúc pháp lý và chỉ ra các điểm thường gặp trong thực tiễn áp dụng tại Việt Nam.`,
  en: ({ topicTitle, frame, categoryFrame }) =>
    `${categoryFrame} ${topicTitle} belongs in this section, and reading it correctly requires placing it within ${frame} and the implementing instruments built around it. The entry below sets out the principal components, analyses the legal architecture, and flags the questions that typically arise in Vietnamese practice.`,
}

/* Closing "See also" cross-reference paragraph template. */
export const SEE_ALSO = {
  vi: ({ siblings, glossarySlug }) =>
    `Để có cái nhìn tổng thể, bạn đọc nên đọc thêm các mục liên quan trong cùng cụm tri thức${siblings.length ? ` — đặc biệt là ${siblings.join(', ')}` : ''}. Khi gặp các thuật ngữ chuyên ngành chưa rõ, hãy tham khảo [Tra cứu thuật ngữ](/glossary). Mỗi mục được trích dẫn được rằng các văn bản pháp luật cụ thể được nhắc đến (Hiến pháp 2013, Bộ luật Dân sự 2015, v.v.) là tham chiếu chung; số điều cụ thể sẽ được bổ sung sau khi luật sư rà soát chuyên môn.`,
  en: ({ siblings, glossarySlug }) =>
    `For a complete picture, read the sister entries in the same cluster${siblings.length ? ` — especially ${siblings.join(', ')}` : ''}. When unfamiliar terminology arises, consult the [glossary](/glossary). Each entry is cited at the level of named instruments (the 2013 Constitution, the 2015 Civil Code, etc.) — specific article numbers will be added after qualified-lawyer review.`,
}

/* Methodological-note callout placed at the end of each article body. */
export const METHODOLOGY_NOTE = {
  vi: 'Bản thảo do AI khởi tạo từ đề cương biên tập, đang chờ rà soát chuyên môn. Các trích dẫn pháp luật cụ thể (số điều, văn bản) sẽ được bổ sung trong các đợt cập nhật tới. Nội dung chỉ mang tính tham khảo và không thay thế tư vấn pháp lý cá nhân.',
  en: 'AI-drafted from an editorial outline, pending qualified-lawyer review. Specific statutory citations (article numbers and instrument designations) will be added in subsequent revisions. The content is informational and does not substitute for individualised legal advice.',
}
