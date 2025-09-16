"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { LensOverlay } from "@/components/LensOverlay"

export default function AcademicPaperDemo() {
  // Ensure page always starts at the top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="min-h-screen bg-white">
      <LensOverlay />

      {/* Back Button */}
      <Link 
        href="/"
        className="fixed top-4 left-4 z-50 bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2 backdrop-blur-sm border border-gray-200 hover:border-gray-300"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Home</span>
      </Link>

      {/* PDF-style container */}
      <div className="max-w-4xl mx-auto bg-white shadow-2xl min-h-screen">
        {/* PDF Header */}
        <div className="px-12 pt-16 pb-8 border-b border-gray-300">
          <div className="text-center space-y-6">
            <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">
              UC Davis Computer Science Department
            </div>
            <h1 className="text-3xl font-bold text-black leading-tight font-serif">
              Classification Technique to Detect Breast Cancer
            </h1>
            <div className="text-base text-gray-700 space-y-3">
              <p className="font-medium">Toniya Patil, Shevangae Singh, Utkarsh Nandy, Mohammad Mendahawai, Arav Mukherjee</p>
              <p className="text-sm italic">Computer Science Department, University of California, Davis</p>
              <p className="text-sm italic">tbpatil@ucdavis.edu, svisingh@ucdavis.edu, unandy@ucdavis.edu</p>
              <p className="text-sm italic">mmendahawi@ucdavis.edu, arvmukherjee@ucdavis.edu</p>
            </div>
            <div className="text-xs text-gray-600 pt-3 border-t border-gray-200 space-y-1">
              <p>Final Project Report - Spring 2024</p>
              <p>ECS 171: Machine Learning - University of California, Davis</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="px-12 py-4 bg-yellow-50 border-b border-yellow-200">
          <p className="text-sm text-yellow-800 italic text-center">
            <strong>Demo Notice:</strong> This is an adaptation of a UC Davis research paper submitted as a project for a machine learning class. This is purely for demonstration purposes only. 
            Content has been modified to showcase AsterAI's document analysis capabilities.
          </p>
        </div>

        {/* PDF Content */}
        <div className="px-12 py-8 space-y-8 text-black font-serif leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-black border-b border-gray-300 pb-2 font-sans">
              Abstract
            </h2>
            <p className="text-justify leading-relaxed text-gray-800">
              Breast cancer tumor detection and classification has always been a popular area of medical study because of its 
              importance in early diagnosis. Many existing methods based on machine learning, have made substantial contributions 
              in this field. However, these methods still face challenges, as they exhibit class imbalances, which could lead to 
              the underrepresentation of less common cancer types. In this paper, we propose a breast cancer classifier model that 
              takes detailed input from the user to describe the tumor. The methodology involves preprocessing the data by removing 
              irrelevant columns and conducting exploratory data analysis (EDA) to eliminate weakly correlated features, resulting 
              in a cleaned dataset of 19 features. For accurate classification, we employ a model based on the Yggdrasil Decision 
              Forest ML algorithm, incorporating K-fold cross-validation to prevent overfitting. We have rigorously tested the 
              proposed model on data distinguishing benign and malignant tumors. The model achieved a highest accuracy of 98%. 
              The model performed well on test data containing more than 500 samples, producing fewer than 5% false diagnoses.
            </p>
            <p className="text-sm text-gray-600 italic">
              <strong>Index Terms:</strong> Machine Learning, Yggdrasil Decision Forest, Classification, Breast Cancer, 
              Malignant, Benign
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-black border-b border-gray-300 pb-2 font-sans">
              1. Introduction
            </h2>
            <p className="text-justify leading-relaxed text-gray-800">
              In the United States alone, around 42,000 women and 500 men die from breast cancer every year. There are 
              five total stages of breast cancer ranging from stage 0 to stage IV. When the cancer is identified at stage 0 
              or I, the five-year survival rate is 99%. This means that a person diagnosed with breast cancer at stage 0 or I 
              is 99% as likely to survive for five years as a person without breast cancer. At stage II, the five-year survival 
              rate drops to 93%. At stage III, it drops significantly to 72%. Lastly, at stage IV, the probability of five-year 
              survival becomes very poor at 22%. Given these statistics along with the prevalence of this disease, it is clear 
              that early and accurate detection is crucial to saving lives.
            </p>
            <p className="text-justify leading-relaxed text-gray-800">
              The integration of machine learning (ML) techniques along with traditional detection methods such as ultrasound, 
              mammogram, MRI, and biopsy have the potential to enhance diagnostic accuracy and efficiency. Our dataset contains 
              feature descriptions from MRI scans of different patients. Figure 1 visualizes the MRI scans for benign and 
              malignant cancer tumors, showing the visual differences that are crucial for accurate classification.
            </p>

            <div className="my-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <img
                src="/mri-scan-comparison.jpg"
                alt="MRI Scan comparison showing benign vs malignant tumor characteristics"
                className="w-full h-auto rounded border border-gray-300"
              />
              <p className="text-sm text-gray-600 mt-3 text-center">
                <strong>Fig. 1.</strong> MRI Scan of Patient with benign Cancer Tumor vs. Malignant Tumor
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-black border-b border-gray-300 pb-2 font-sans">
              2. Literature Review
            </h2>
            <p className="text-justify leading-relaxed text-gray-800">
              Recent studies have made substantial contributions in the field of machine learning (ML) for breast cancer 
              detection, highlighting both the potential and challenges of these techniques. These existing studies have made 
              substantial contributions to using ML for breast cancer detection but are still subject to critical challenges 
              inherent to many ML techniques. Breast cancer datasets tend to exhibit class imbalance, which traditional models 
              struggle to handle effectively. This can lead to an underrepresentation of less common breast cancer types, 
              especially in a classification context.
            </p>


            <p className="text-justify leading-relaxed text-gray-800">
              Yggdrasil Decision Forests (YDFs), comprised of various tree-based machine learning models such as Decision Trees, 
              Random Forests, and Gradient Boosted Trees offer a promising solution to these issues. Starting with class imbalance, 
              YDFs implement several techniques such as ensemble learning to combat this. In terms of interpretability, YDFs provide 
              insights into feature importance and decision paths, leading to much greater transparency compared to traditional 
              "black-box models". YDFs are highly efficient and capable of handling complex medical imaging data with faster 
              training times than traditional ML models.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-black border-b border-gray-300 pb-2 font-sans">
              3. Exploratory Data Analysis
            </h2>
            <p className="text-justify leading-relaxed text-gray-800">
              In this section, we conduct exploratory data analysis (EDA), as visualized in Figure 2, to understand and visualize 
              the breast cancer dataset's patterns, distributions, and relationships. This involves describing the dataset, examining 
              numerical and categorical variables, and identifying key observations useful while building the model. This model aims 
              to classify the type of Breast Cancer using Digital Image Analysis.
            </p>

            <div className="my-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <img
                src="/eda-pipeline.jpg"
                alt="EDA pipeline showing data preprocessing and analysis workflow"
                className="w-full h-auto rounded border border-gray-300"
              />
              <p className="text-sm text-gray-600 mt-3 text-center">
                <strong>Fig. 2.</strong> EDA PIPELINE
              </p>
            </div>

            <p className="text-justify leading-relaxed text-gray-800">
              Each numeric variable represents different measurements. Table I shows the mean, median, and standard deviation for 
              each variable. Each categorical variable in the dataset represents different categories (like benign and malignant). 
              Table II contains the frequency distributions for the variables.
            </p>

            {/* Table I */}
            <div className="my-8">
              <h3 className="text-lg font-bold text-black mb-4 text-center">TABLE I<br/>SUMMARY FOR NUMERICAL VARIABLES</h3>
              <div className="overflow-x-auto bg-white border border-gray-300 rounded-lg">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left border-b">Variable</th>
                      <th className="px-4 py-2 text-center border-b">Mean</th>
                      <th className="px-4 py-2 text-center border-b">Median</th>
                      <th className="px-4 py-2 text-center border-b">Standard Deviation</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs">
                    <tr><td className="px-4 py-1 border-b">id</td><td className="px-4 py-1 border-b text-center">30,371,830</td><td className="px-4 py-1 border-b text-center">906,024</td><td className="px-4 py-1 border-b text-center">125,020,600</td></tr>
                    <tr><td className="px-4 py-1 border-b">radius mean</td><td className="px-4 py-1 border-b text-center">14.13</td><td className="px-4 py-1 border-b text-center">13.37</td><td className="px-4 py-1 border-b text-center">3.52</td></tr>
                    <tr><td className="px-4 py-1 border-b">texture mean</td><td className="px-4 py-1 border-b text-center">19.29</td><td className="px-4 py-1 border-b text-center">18.84</td><td className="px-4 py-1 border-b text-center">4.30</td></tr>
                    <tr><td className="px-4 py-1 border-b">perimeter mean</td><td className="px-4 py-1 border-b text-center">91.97</td><td className="px-4 py-1 border-b text-center">86.24</td><td className="px-4 py-1 border-b text-center">24.30</td></tr>
                    <tr><td className="px-4 py-1 border-b">area mean</td><td className="px-4 py-1 border-b text-center">654.89</td><td className="px-4 py-1 border-b text-center">551.10</td><td className="px-4 py-1 border-b text-center">351.91</td></tr>
                    <tr><td className="px-4 py-1 border-b">smoothness mean</td><td className="px-4 py-1 border-b text-center">0.096</td><td className="px-4 py-1 border-b text-center">0.096</td><td className="px-4 py-1 border-b text-center">0.014</td></tr>
                    <tr><td className="px-4 py-1 border-b">compactness mean</td><td className="px-4 py-1 border-b text-center">0.104</td><td className="px-4 py-1 border-b text-center">0.093</td><td className="px-4 py-1 border-b text-center">0.053</td></tr>
                    <tr><td className="px-4 py-1 border-b">concavity mean</td><td className="px-4 py-1 border-b text-center">0.089</td><td className="px-4 py-1 border-b text-center">0.062</td><td className="px-4 py-1 border-b text-center">0.080</td></tr>
                    <tr><td className="px-4 py-1 border-b">symmetry mean</td><td className="px-4 py-1 border-b text-center">0.181</td><td className="px-4 py-1 border-b text-center">0.179</td><td className="px-4 py-1 border-b text-center">0.027</td></tr>
                    <tr><td className="px-4 py-1">fractal dimension mean</td><td className="px-4 py-1 text-center">0.063</td><td className="px-4 py-1 text-center">0.062</td><td className="px-4 py-1 text-center">0.007</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table II */}
            <div className="my-8">
              <h3 className="text-lg font-bold text-black mb-4 text-center">TABLE II<br/>FREQUENCY DISTRIBUTION FOR CATEGORICAL VARIABLES</h3>
              <div className="overflow-x-auto bg-white border border-gray-300 rounded-lg">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left border-b">Variable</th>
                      <th className="px-4 py-2 text-center border-b">B (Benign)</th>
                      <th className="px-4 py-2 text-center border-b">M (Malignant)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 border-b">Count</td>
                      <td className="px-4 py-2 border-b text-center">357</td>
                      <td className="px-4 py-2 border-b text-center">212</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-justify leading-relaxed text-gray-800">
              Some key observations include: The dataset has more benign cases (357) compared to malignant cases (212). 
              Variables like radius, texture, perimeter, and area have significantly different scales, with area values 
              being higher than the radius and perimeter. Skewness in a dataset refers to the asymmetry in the distribution 
              of data values, as shown in Figure 3.
            </p>

            <div className="my-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <img
                src="/data-skewness-analysis.jpg"
                alt="Data skewness analysis showing left-skewed vs right-skewed distributions"
                className="w-full h-auto rounded border border-gray-300"
              />
              <p className="text-sm text-gray-600 mt-3 text-center">
                <strong>Fig. 3.</strong> Skewness of Data-left skewed has the tail to left vs. Right Skewed has a tail to the right
              </p>
            </div>

            <p className="text-justify leading-relaxed text-gray-800">
              Outliers are data points that are significantly different from the rest of the data. Figure 4 visualizes the 
              outliers (if present) and values of skewness by plotting the features and values for each variable.
            </p>

            <div className="my-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <img
                src="/outlier-detection.jpg"
                alt="Outlier detection visualization with skewness values for each feature"
                className="w-full h-auto rounded border border-gray-300"
              />
              <p className="text-sm text-gray-600 mt-3 text-center">
                <strong>Fig. 4.</strong> Visualization of Outliers along with the skewness values to depict if the feature contains outliers or not
              </p>
            </div>

            <p className="text-justify leading-relaxed text-gray-800">
              Correlational analysis is a statistical technique used to determine the relationship between variables. 
              The correlation matrix in Figure 5 revealed several pairs of features with high correlation coefficients 
              (greater than 0.95), indicating redundancy.
            </p>

            <div className="my-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <img
                src="/correlation-matrix.jpg"
                alt="Correlation matrix showing highly correlated features in red and uncorrelated features in blue"
                className="w-full h-auto rounded border border-gray-300"
              />
              <p className="text-sm text-gray-600 mt-3 text-center">
                <strong>Fig. 5.</strong> Correlational Matrix where red shows the highly correlated features and light blue is uncorrelated features
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-black border-b border-gray-300 pb-2 font-sans">
              4. Experimental Results
            </h2>
            <p className="text-justify leading-relaxed text-gray-800">
              The performance of our random forest model was evaluated using KFold cross-validation. We trained the 
              model on various folds ranging from 2 to 10. As noticed in Figure 6, the accuracy of our model increased 
              with increasing batch size. After training each model, it was appended to an empty list. Using the 'argmax' 
              function, we filtered out the best model with the highest accuracy.
            </p>

            <div className="my-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <img
                src="/batch-size-accuracy.jpg"
                alt="Chart showing the relationship between batch size and model accuracy"
                className="w-full h-auto rounded border border-gray-300"
              />
              <p className="text-sm text-gray-600 mt-3 text-center">
                <strong>Fig. 6.</strong> Batch size vs Accuracy
              </p>
            </div>

            <p className="text-justify leading-relaxed text-gray-800">
              Figure 7 shows the relationship between batch size and MSE, indicating that lower batch sizes resulted in models 
              with more noise. By decreasing the batch size, we reduced the variance in the gradient estimates, effectively 
              smoothing out the fluctuations. As a result, we were able to lower the MSE of the model.
            </p>

            <div className="my-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <img
                src="/batch-size-mse.jpg"
                alt="Chart showing the relationship between batch size and Mean Squared Error (MSE)"
                className="w-full h-auto rounded border border-gray-300"
              />
              <p className="text-sm text-gray-600 mt-3 text-center">
                <strong>Fig. 7.</strong> Batch size vs MSE
              </p>
            </div>

            <p className="text-justify leading-relaxed text-gray-800">
              We produced a confusion matrix to display the results of testing our model on the sample dataset. The confusion 
              matrix yielded a false positive rate of 5.07% and a false negative rate of 0.515%. Overall, the model yielded 
              20 wrong predictions out of 569 samples, resulting in a 3.51% error rate. The mean squared error of the 
              best model was 0.0351%, indicating an extremely small error rate.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-black border-b border-gray-300 pb-2 font-sans">
              5. Evaluation and Conclusion
            </h2>
            <p className="text-justify leading-relaxed text-gray-800">
              Previous studies on breast cancer classification have yielded accuracies such as 98% for SVM, 78-92% 
              for combinations of AlexNet, VGG 16, Inception, ResNet, and Nasnet, and 95-96% for Inception v3, ResNet 50, 
              VGG 16, and VGG 19. We achieved accuracies over 95% through our Yggdrasil random forest approach. The best 
              model yielded an accuracy of over 98.5% and the MSE was lower than 1%. Our study presents a model for 
              classifying breast cancer tumors as Benign or Malignant using a Random Forest classifier implemented through 
              the Yggdrasil Decision Forest library, contributing to the early detection of breast cancer.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-black border-b border-gray-300 pb-2 font-sans">
              References
            </h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                [1] CDC Breast Cancer, "Basic information about breast cancer," Centers for Disease Control and Prevention, 
                Sep. 14, 2020. cdc.gov
              </p>
              <p>
                [2] World Cancer Research Fund International, "Worldwide cancer data — World Cancer Research Fund International," 
                WCRF International, 2022. wcrf.org
              </p>
              <p>
                [3] Research Gate, Figure 1 - uploaded by Md Abdullah Al Nasim, www.researchgate.net, June. 30, 2019. 
                www.researchgate.net
              </p>
              <p>
                [4] American Cancer Society, "Survival rates for breast cancer," www.cancer.org, Mar. 01, 2023. wcrf.org
              </p>
              <p>
                [5] Rose, C. (n.d.). DDSM: Digital Database for Screening Mammography. USF Digital Mammography Home Page. 
                www.eng.usf.edu
              </p>
              <p>
                [6] Centers for Disease Control and Prevention, "How Is Breast Cancer Diagnosed?," CDC, 2019. cdc.gov
              </p>
              <p>
                [7] Daraje kaba Gurmessa and Worku Jimma, "Explainable machine learning for breast cancer diagnosis from 
                mammography and ultrasound images: a systematic review," BMJ Health & Care Informatics, vol.31, no.1, pp. 
                e100954–e100954, Feb. 2024, doi: doi.org
              </p>
              <p>
                [8] "Yggdrasil Decision Forests - Yggdrasil Decision Forests' documentation," ydf.readthedocs.io. 
                ydf.readthedocs.io
              </p>
              <p>
                [9] University of California Irvine Machine Learning Repository, "Breast Cancer Wisconsin (Diagnostic) Data Set," 
                UCI, 2023. archive.ics.uci.edu
              </p>
              <p>
                [10] PrepBytes, "iloc function in Python," PrepBytes Blog, 2023. prepbytes.com
              </p>
              <p>
                [11] M. Guillame-Bert, S. Bruch, R. Stotz, J. Pfeifer, "Yggdrasil Decision Forests: A Fast and Extensible 
                Decision Forests Library," arXiv preprint, 2022. arxiv.org
              </p>
              <p>
                [12] S. Arooj et al., "Breast cancer detection and classification empowered with transfer learning," 
                Frontiers in public health, https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9289190/ (accessed Jun. 5, 2024). 
                www.ncbi.nlm.nih.gov
              </p>
            </div>
          </section>
        </div>

        {/* PDF Footer */}
        <div className="px-12 py-6 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>UC Davis ECS 171: Machine Learning | Final Project Report | Spring 2024 | Classification Technique to Detect Breast Cancer</p>
        </div>
      </div>

      {/* Instructions overlay */}
      <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg text-sm">
        Hold <kbd className="bg-gray-700 px-2 py-1 rounded text-xs">Alt</kbd> or <kbd className="bg-gray-700 px-2 py-1 rounded text-xs">⌥</kbd> to activate Lens Mode
      </div>
    </div>
  )
}
