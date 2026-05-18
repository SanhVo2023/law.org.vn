/* Reusable narrative bank for the SEO-content generator. Bilingual.
 *
 * IMPORTANT — citation policy (F-005 + F-007, Mr Hien 2026-05-11 / 2026-05-17):
 * Generated section bodies do NOT name specific statutes and do NOT quote law text
 * verbatim. The earlier random-hash pickFramework() was removed in F-005; F-007 now
 * also removes verbatim Constitution pull quotes and tightens the tone to be
 * relative/qualified rather than assertive, to limit company liability if downstream
 * content is incorrect. Citations only appear in:
 *   (1) the topic title and section headings themselves (always topic-appropriate)
 *   (2) the CATEGORY_FRAMES intro line (hand-written per cluster, generic)
 * Pull quotes are now editorial paraphrases attributed to Apolo Editorial, not the
 * Constitution. Specific article-and-instrument citations are added later by lawyers.
 */

/* Pull quotes — editorial paraphrases. NOT verbatim statutory text (per F-007). */
export const DEFAULT_PULL_QUOTES = {
  vi: [
    {
      quote: 'Hiểu pháp luật là điều kiện đầu tiên để vận dụng pháp luật một cách có trách nhiệm.',
      attribution: 'Apolo Editorial',
    },
    {
      quote: 'Một quy phạm pháp luật chỉ có ý nghĩa khi được đặt trong tổng thể hệ thống mà nó thuộc về.',
      attribution: 'Apolo Editorial',
    },
    {
      quote: 'Pháp luật là công cụ chứ không phải mục tiêu — mục tiêu cuối cùng là sự công bằng trong quan hệ xã hội.',
      attribution: 'Apolo Editorial',
    },
  ],
  en: [
    {
      quote: 'Understanding the law is the first prerequisite for applying it responsibly.',
      attribution: 'Apolo Editorial',
    },
    {
      quote: 'A legal norm only becomes meaningful when read within the broader system to which it belongs.',
      attribution: 'Apolo Editorial',
    },
    {
      quote: 'Law is an instrument, not an end in itself — the ultimate aim is fairness in social relations.',
      attribution: 'Apolo Editorial',
    },
  ],
}

/* Category-level intros that establish the framing of every article in the cluster.
 * Hand-written per cluster — no random statute names. Court-system intro updated for
 * the post-Luật 81/2025/QH15 three-tier hierarchy. */
export const CATEGORY_FRAMES = {
  vi: {
    'legal-system':
      'Khi tiếp cận hệ thống pháp luật Việt Nam, bạn đọc cần hiểu rằng các nguồn luật được sắp xếp theo một trật tự thứ bậc — Hiến pháp đứng ở vị trí cao nhất, theo sau là các đạo luật do Quốc hội ban hành, rồi đến các văn bản dưới luật.',
    'court-system':
      'Hệ thống tòa án Việt Nam vận hành theo nguyên tắc hai cấp xét xử và được tổ chức theo Luật số 81/2025/QH15: Tòa án nhân dân tối cao, Tòa án nhân dân cấp tỉnh và Tòa án nhân dân khu vực, cùng các tòa chuyên trách.',
    litigation:
      'Tố tụng tại Việt Nam thường đề cao nguyên tắc thỏa thuận và hòa giải trước khi đưa vụ việc ra xét xử chính thức — một đặc điểm phản ánh truyền thống pháp lý dân luật.',
    rights:
      'Quyền và nghĩa vụ của công dân được công nhận, tôn trọng và bảo đảm theo Hiến pháp và pháp luật, nhưng phạm vi của các quyền này thường được giới hạn theo quy định cụ thể trong từng lĩnh vực.',
    terminology:
      'Thuật ngữ pháp lý không chỉ là từ ngữ — đó là công cụ chính xác hóa khái niệm, đặc biệt cần thiết khi văn bản pháp luật được dịch sang ngôn ngữ khác hoặc tham chiếu qua nhiều cấp văn bản.',
    faq:
      'Mặc dù bộ tri thức này không thay thế tư vấn cá nhân, các câu trả lời dưới đây phản ánh khung pháp lý phổ biến hiện hành tại Việt Nam và thực tiễn áp dụng thông thường.',
  },
  en: {
    'legal-system':
      "When approaching Vietnam's legal system, readers should recognise that sources of law are arranged in a hierarchy — the Constitution sits at the apex, followed by statutes enacted by the National Assembly, and then subordinate normative instruments.",
    'court-system':
      "Vietnam's court system operates on the two-tier review principle and is organized under Law No. 81/2025/QH15: the Supreme People's Court, provincial people's courts, and regional people's courts, together with specialized courts.",
    litigation:
      'Vietnamese procedure tends to emphasise consensual resolution and mediation before formal adjudication — a feature that reflects the underlying civil-law tradition.',
    rights:
      'Citizens\' rights and obligations are recognised, respected, and protected under the Constitution and statute, but the scope of those rights is typically delimited by specific provisions in each subject area.',
    terminology:
      'Legal vocabulary is not merely linguistic — it is the precision instrument by which concepts are operationalised, and it becomes especially important when texts cross language boundaries or reference instruments at multiple levels.',
    faq:
      'While this encyclopedia is not a substitute for individualised counsel, the answers below reflect the prevailing legal framework in Vietnam and common application practice.',
  },
}

/* Section narrative templates — three variants rotated by section index for variety.
 * Templates are TOPIC-AGNOSTIC and use tentative/relative phrasing per F-007. */
export const SECTION_TEMPLATES = {
  vi: [
    {
      paraA: ({ section, topicTitle }) =>
        `${section} thường là khía cạnh đầu tiên cần làm rõ khi tiếp cận ${topicTitle.toLowerCase()}. Phần này tập trung vào nội hàm, phạm vi và các yếu tố cấu thành của ${section.toLowerCase()} — đặt trong tổng thể khung pháp luật Việt Nam đã được nêu ở phần mở đầu. Nội dung mang tính tham khảo, cần đối chiếu với văn bản pháp luật mới nhất trước khi áp dụng.`,
      paraB: ({ section }) =>
        `Về mặt cấu trúc, các quy định liên quan đến ${section.toLowerCase()} thường được sắp xếp thành hai nhóm: nhóm quy phạm chung quy định nguyên tắc và phạm vi áp dụng, và nhóm quy phạm chi tiết quy định trình tự, thủ tục và hậu quả pháp lý. Trong nhiều trường hợp, các văn bản hướng dẫn cấp Bộ giúp cụ thể hóa cách áp dụng cho các tình huống điển hình mà luật chưa thể bao quát hết. Người đọc thường nên đối chiếu giữa quy phạm gốc và văn bản hướng dẫn thay vì chỉ dựa vào một trong hai.`,
      paraC: ({ section }) =>
        `Trong thực tiễn, ${section.toLowerCase()} thường là điểm tham chiếu được các bên nhắc đến — từ luật sư, thẩm phán đến cán bộ hành chính. Những vướng mắc thường xuất phát không phải từ bản thân quy phạm mà từ cách áp dụng quy phạm vào tình huống cụ thể, đặc biệt khi các quy định mới ban hành chưa có án lệ hoặc hướng dẫn nội bộ rõ ràng.`,
    },
    {
      paraA: ({ section, topicTitle }) =>
        `Một thành tố thường không thể bỏ qua khi tiếp cận ${topicTitle.toLowerCase()} là ${section.toLowerCase()}. Phần này đề cập đến cấu trúc, chức năng và phạm vi của ${section.toLowerCase()} trong tổng thể hệ thống pháp luật. Cách hiểu phù hợp về phần này có thể giúp người đọc tránh được các nhầm lẫn phổ biến và xây dựng nền tảng kiến thức ổn định cho các vấn đề chuyên sâu hơn.`,
      paraB: ({ section }) =>
        `Khung pháp lý điều chỉnh ${section.toLowerCase()} thường bám sát các nguyên tắc chung của hệ thống dân luật mà Việt Nam theo truyền thống — đề cao tính rõ ràng của quy phạm thành văn, vai trò trung tâm của cơ quan lập pháp và sự bổ trợ có giới hạn của thực tiễn xét xử. Các quy phạm liên quan thường tham chiếu chéo giữa nhiều văn bản, nên việc đọc một quy phạm cô lập có thể dẫn đến hiểu chưa đầy đủ về phạm vi áp dụng thực tế.`,
      paraC: ({ section, related }) =>
        `Khi áp dụng vào tình huống cụ thể, ${section.toLowerCase()} thường tương tác với các vấn đề ở các phần khác — chẳng hạn ${related}. Trong nhiều trường hợp, thẩm phán, luật sư và nhà nghiên cứu cần xem xét toàn diện các vấn đề liên quan thay vì xử lý từng phần một cách biệt lập.`,
    },
    {
      paraA: ({ section }) =>
        `${section} thường được xem là một trong những trụ cột mà bạn đọc cần nắm vững. Nội dung của phần này liên quan đến cả khía cạnh quy phạm thuần túy lẫn khía cạnh thực thi — tức là không chỉ "luật quy định gì" mà còn "luật được áp dụng như thế nào". Sự phân biệt này có ý nghĩa đặc biệt trong môi trường pháp lý Việt Nam, nơi văn bản hướng dẫn và thực tiễn cơ quan có thẩm quyền thường đóng vai trò bổ trợ đáng kể.`,
      paraB: ({ section }) =>
        `Khung pháp lý áp dụng cho ${section.toLowerCase()} thường bao gồm các văn bản quy phạm pháp luật chuyên ngành cùng các nghị định, thông tư hướng dẫn liên quan. Đây là một mô hình quy phạm điển hình của hệ thống dân luật, trong đó các nguyên tắc trừu tượng được cụ thể hóa qua nhiều cấp văn bản dưới luật. Số điều và tên văn bản cụ thể sẽ được bổ sung sau khi luật sư rà soát chuyên môn.`,
      paraC: ({ section }) =>
        `Ý nghĩa thực tiễn của ${section.toLowerCase()} thường thể hiện rõ ở các tình huống có yếu tố tranh chấp hoặc cần xác lập quyền và nghĩa vụ rõ ràng giữa các bên. Người tham gia quan hệ pháp luật thường cần xác định rõ vị thế pháp lý của mình trước khi đưa ra quyết định.`,
    },
  ],
  en: [
    {
      paraA: ({ section, topicTitle }) =>
        `${section} is often the first dimension to clarify when approaching ${topicTitle.toLowerCase()}. This section focuses on the substance, scope, and constituent elements of ${section.toLowerCase()} — read within the wider Vietnamese legal framework introduced above. The material is for reference and should be verified against the latest statutory text before being applied.`,
      paraB: ({ section }) =>
        `Structurally, the rules touching on ${section.toLowerCase()} typically fall into two groups: general norms that set out principles and scope of application, and detailed norms that prescribe procedure and legal consequences. Ministerial guidance often fills in operational detail for typical fact-patterns the statute itself cannot fully anticipate. Readers should generally cross-read the parent provision and its implementing instruments rather than relying on either in isolation.`,
      paraC: ({ section }) =>
        `In practice, ${section.toLowerCase()} is often a reference point lawyers, judges, and administrative officers return to repeatedly. Difficulties tend to arise not from the norm itself but from how it applies to a specific situation — especially where recently-enacted provisions have not yet generated precedent or internal guidance.`,
    },
    {
      paraA: ({ section, topicTitle }) =>
        `An often-inseparable component of ${topicTitle.toLowerCase()} is ${section.toLowerCase()}. This section addresses the structure, function, and scope of ${section.toLowerCase()} within the wider legal system. A suitable reading of this material can help readers avoid common misconceptions and build a stable foundation for the more specialised material that follows.`,
      paraB: ({ section }) =>
        `The framework governing ${section.toLowerCase()} generally tracks the broader principles of the civil-law tradition Vietnam follows — privileging the clarity of written norms, the central role of the legislature, and a supplementary role for adjudicative practice. The relevant rules tend to cross-reference multiple instruments, so reading any single provision in isolation may give an incomplete picture of its actual reach.`,
      paraC: ({ section, related }) =>
        `When applied to concrete situations, ${section.toLowerCase()} often interacts with other parts — for example, ${related}. Judges, counsel, and researchers generally need to assess the related issues holistically rather than treating any one piece in isolation.`,
    },
    {
      paraA: ({ section }) =>
        `${section} is often regarded as one of the load-bearing pillars readers should internalise. The substance of this section touches both the pure-norm dimension and the enforcement dimension — not just what the law says, but how it tends to be applied. The distinction is especially salient in Vietnam, where guidance documents and the established practice of competent authorities often play a substantial supplementary role.`,
      paraB: ({ section }) =>
        `The legal framework relevant to ${section.toLowerCase()} generally sits in specialised statutory instruments, complemented by implementing decrees and circulars. This is a typical normative pattern in the civil-law tradition: abstract principles are operationalised through multiple successive instruments below the statute. Specific article numbers and named instruments are added in the qualified-lawyer review pass.`,
      paraC: ({ section }) =>
        `The practical importance of ${section.toLowerCase()} often comes through clearly when there is a dispute or where rights and obligations between parties need to be made determinate. Participants in the legal relationship generally need to clarify their own legal position before making decisions.`,
    },
  ],
}

/* Lede paragraph templates (used as the opening that gets a drop cap). */
export const LEDE_TEMPLATES = {
  vi: ({ topicTitle, categoryFrame }) =>
    `${categoryFrame} ${topicTitle} thuộc về phần nội dung này, và bài viết dưới đây trình bày các thành tố chính, phân tích cấu trúc pháp lý và chỉ ra các điểm thường gặp trong thực tiễn áp dụng tại Việt Nam. Nội dung chỉ có giá trị tham khảo và cần đối chiếu với nguồn chính thức; các trích dẫn cụ thể (số điều, tên văn bản) sẽ được bổ sung sau khi luật sư rà soát chuyên môn.`,
  en: ({ topicTitle, categoryFrame }) =>
    `${categoryFrame} ${topicTitle} belongs in this section. The entry below sets out the principal components, analyses the legal architecture, and flags the questions that typically arise in Vietnamese practice. For reference only; please verify against official sources. Specific citations (article numbers and instrument designations) will be added after qualified-lawyer review.`,
}

/* Closing "See also" cross-reference paragraph template. */
export const SEE_ALSO = {
  vi: ({ siblings }) =>
    `Để có cái nhìn tổng thể, bạn đọc nên đọc thêm các mục liên quan trong cùng cụm tri thức${siblings.length ? ` — đặc biệt là ${siblings.join(', ')}` : ''}. Khi gặp các thuật ngữ chuyên ngành chưa rõ, hãy tham khảo [Tra cứu thuật ngữ](/glossary).`,
  en: ({ siblings }) =>
    `For a complete picture, read the sister entries in the same cluster${siblings.length ? ` — especially ${siblings.join(', ')}` : ''}. When unfamiliar terminology arises, consult the [glossary](/glossary).`,
}

/* Methodological-note callout placed at the end of each article body. */
export const METHODOLOGY_NOTE = {
  vi: 'Bản thảo do AI khởi tạo từ đề cương biên tập, đang chờ rà soát chuyên môn. Các trích dẫn pháp luật cụ thể (số điều, tên văn bản) sẽ được bổ sung trong các đợt cập nhật tới. Thông tin trên website chỉ có giá trị tham khảo, không thay thế cho ý kiến tư vấn pháp lý cá nhân và không làm phát sinh quan hệ tư vấn giữa luật sư và khách hàng. Công ty Luật Apolo Lawyers không chịu trách nhiệm cho việc áp dụng nội dung này vào tình huống cụ thể.',
  en: 'AI-drafted from an editorial outline, pending qualified-lawyer review. Specific statutory citations (article numbers and instrument designations) will be added in subsequent revisions. The information on this website is provided for reference purposes only, does not constitute legal advice, and does not create an attorney-client relationship. Apolo Lawyers disclaims liability for the application of this content to any specific situation.',
}
