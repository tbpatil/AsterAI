"use client"

import { LensOverlay } from "@/components/LensOverlay"

export default function ResearchPaperPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <LensOverlay />

      {/* PDF-style container */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-2xl min-h-screen">
        {/* PDF Header */}
        <div className="px-12 pt-16 pb-8 border-b border-gray-200 dark:border-gray-700">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
              Interactive Document Analysis: A Novel Approach to Content Exploration
            </h1>
            <div className="text-lg text-gray-600 dark:text-gray-400 space-y-2">
              <p>John Smith¹, Sarah Johnson², Michael Chen³</p>
              <p className="text-sm">¹University of Technology, ²Research Institute, ³Innovation Labs</p>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-500 pt-2">
              Received: March 15, 2024 | Accepted: April 22, 2024 | Published: May 1, 2024
            </div>
          </div>
        </div>

        {/* PDF Content */}
        <div className="px-12 py-8 space-y-8 text-gray-900 dark:text-gray-100">
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-600 pb-2">
              Abstract
            </h2>
            <p className="text-justify leading-relaxed text-gray-800 dark:text-gray-200">
              This paper presents a revolutionary approach to document interaction through lens-based content analysis.
              Our methodology enables real-time content summarization, visualization, and similarity detection through
              an intuitive overlay system. We demonstrate significant improvements in user engagement and comprehension
              rates compared to traditional document viewing methods. The system achieves 94% accuracy in content
              categorization and reduces information processing time by 40%.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
              <strong>Keywords:</strong> interactive documents, content analysis, user interface, machine learning,
              information retrieval
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-600 pb-2">
              1. Introduction
            </h2>
            <p className="text-justify leading-relaxed text-gray-800 dark:text-gray-200">
              The exponential growth of digital content has created an urgent need for more efficient document
              interaction paradigms. Traditional static document viewers fail to leverage the rich contextual
              information available in modern content management systems. Our research addresses this gap by introducing
              a lens-based interaction model that provides contextual analysis capabilities directly within the document
              viewing experience.
            </p>
            <p className="text-justify leading-relaxed text-gray-800 dark:text-gray-200">
              Recent advances in natural language processing and computer vision have enabled new possibilities for
              intelligent document interaction. However, existing solutions often require users to switch between
              multiple applications or interfaces, disrupting the natural reading flow. Our approach maintains document
              immersion while providing powerful analytical tools through an innovative overlay system activated by
              simple keyboard interactions.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-600 pb-2">
              2. Methodology
            </h2>
            <p className="text-justify leading-relaxed text-gray-800 dark:text-gray-200">
              Our lens-based interaction system consists of three core components: the overlay detection engine, the
              content analysis pipeline, and the adaptive user interface. The overlay detection engine uses DOM
              traversal algorithms to identify interactive elements and their semantic boundaries. When activated
              through the Alt key modifier, the system creates a semi-transparent overlay that highlights hoverable
              content areas.
            </p>

            <div className="my-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <img
                src="/research-methodology-diagram-showing-lens-interact.jpg"
                alt="System architecture diagram showing the three-layer lens interaction model"
                className="w-full h-auto rounded border border-gray-300 dark:border-gray-500"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 text-center">
                <strong>Figure 1:</strong> System architecture overview showing the lens interaction pipeline from user
                input to content analysis output.
              </p>
            </div>

            <p className="text-justify leading-relaxed text-gray-800 dark:text-gray-200">
              The content analysis pipeline processes selected text or image content through multiple specialized
              models. For text content, we employ transformer-based summarization models fine-tuned on academic
              literature. Image content is processed through convolutional neural networks trained on scientific figure
              datasets. The similarity detection component uses embedding-based retrieval to identify related content
              within the document corpus.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-600 pb-2">
              3. Results and Analysis
            </h2>
            <p className="text-justify leading-relaxed text-gray-800 dark:text-gray-200">
              We conducted extensive user studies with 150 participants across three different document types: academic
              papers, technical reports, and legal documents. Participants using our lens-based system showed a 40%
              reduction in task completion time and a 25% improvement in comprehension scores compared to control groups
              using traditional PDF viewers.
            </p>

            <div className="my-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <img
                src="/bar-chart-showing-user-performance-metrics-compari.jpg"
                alt="Performance comparison chart showing task completion times and comprehension scores"
                className="w-full h-auto rounded border border-gray-300 dark:border-gray-500"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 text-center">
                <strong>Figure 2:</strong> User performance metrics comparing traditional PDF viewers (blue) with our
                lens-based system (green) across different document types.
              </p>
            </div>

            <p className="text-justify leading-relaxed text-gray-800 dark:text-gray-200">
              The system's accuracy in content categorization reached 94.2% across all tested document types, with
              particularly strong performance on technical content (96.8%) and academic literature (95.1%). Legal
              documents presented the greatest challenge due to specialized terminology, achieving 91.3% accuracy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-600 pb-2">
              4. Discussion and Future Work
            </h2>
            <p className="text-justify leading-relaxed text-gray-800 dark:text-gray-200">
              The lens-based interaction paradigm represents a significant advancement in document viewing technology.
              By seamlessly integrating analytical capabilities into the reading experience, we enable users to maintain
              focus while accessing powerful content analysis tools. The positive user feedback and measurable
              performance improvements validate our approach.
            </p>
            <p className="text-justify leading-relaxed text-gray-800 dark:text-gray-200">
              Future research directions include expanding the system to support collaborative document analysis,
              implementing real-time translation capabilities, and developing domain-specific analysis modules for
              specialized fields such as medical literature and patent documents. We also plan to investigate the
              integration of large language models to provide more sophisticated content understanding and generation
              capabilities.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-600 pb-2">
              5. Conclusion
            </h2>
            <p className="text-justify leading-relaxed text-gray-800 dark:text-gray-200">
              We have successfully demonstrated the effectiveness of lens-based document interaction in improving user
              productivity and comprehension. The system's ability to provide contextual analysis without disrupting the
              reading flow represents a paradigm shift in document viewing technology. Our results indicate significant
              potential for adoption across various domains requiring intensive document analysis.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-600 pb-2">
              References
            </h2>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p>
                [1] Anderson, K., et al. (2023). "Advanced Document Processing Techniques." Journal of Information
                Systems, 45(3), 123-145.
              </p>
              <p>
                [2] Brown, L., & Wilson, M. (2022). "User Interface Design for Content Analysis." ACM Transactions on
                Computer-Human Interaction, 29(4), 1-28.
              </p>
              <p>
                [3] Chen, X., et al. (2024). "Machine Learning Applications in Document Understanding." Nature Machine
                Intelligence, 6(2), 89-102.
              </p>
              <p>
                [4] Davis, R. (2023). "Interactive Systems for Knowledge Discovery." IEEE Computer Graphics and
                Applications, 43(1), 67-78.
              </p>
            </div>
          </section>
        </div>

        {/* PDF Footer */}
        <div className="px-12 py-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-500">
          <p>Interactive Document Analysis | Page 1 of 8 | DOI: 10.1000/xyz123</p>
        </div>
      </div>

      {/* Instructions overlay */}
      <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm">
        Hold <kbd className="bg-blue-700 px-2 py-1 rounded text-xs">Alt</kbd> or <kbd className="bg-blue-700 px-2 py-1 rounded text-xs">⌥</kbd> to activate Lens Mode
      </div>
    </div>
  )
}
