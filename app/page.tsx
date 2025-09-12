"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { 
  Eye, 
  Zap, 
  Brain, 
  Search, 
  FileText, 
  BarChart3, 
  ArrowRight,
  Sparkles,
  Target,
  Clock,
  Users,
  ChevronRight,
  Star,
  Lightbulb,
  Layers,
  Infinity
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black antialiased relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 80% 80% at 50% -20%, rgba(120, 119, 198, 0.3), transparent),
          linear-gradient(to bottom, #000000, #0a0a0a, #111111)
        `
      }}
    >
      {/* Main Spotlight focused on AsterAI */}
      <Spotlight className="-top-40 left-1/2 -translate-x-1/2 md:-top-20" fill="white" />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 h-full w-full bg-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Badge className="mb-8 bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors duration-300 px-6 py-2 text-sm backdrop-blur-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Powered by Advanced AI
              </Badge>
            </motion.div>
            
            {/* Main Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight"
            >
              <span className="bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent">
                Aster
              </span>
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                AI
              </span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-neutral-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Revolutionary AI-powered document analysis that transforms how you interact with content.
              <br />
              <span className="text-blue-400 font-medium">Analyze, summarize, and visualize</span> any document with intelligent lens technology.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <Link href="/demo">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative bg-white text-black px-8 py-4 rounded-xl font-semibold text-lg overflow-hidden transition-all duration-300 flex items-center gap-2 shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">Show Demo</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:text-white transition-colors duration-300 group-hover:translate-x-1" />
                </motion.button>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="border border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-white/40 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center gap-2"
              >
                Learn More
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
            
            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-8 text-sm text-neutral-400"
            >
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                <Target className="w-4 h-4 text-green-400" />
                <span className="text-white">94% Accuracy</span>
            </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-white">40% Faster</span>
            </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-white">Trusted by 1000+</span>
          </div>
            </motion.div>
          </motion.div>
        </div>
          </section>

      {/* Features Section */}
      <section className="relative py-32 bg-black/50 backdrop-blur-sm">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Intelligent Document Analysis
            </h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              Experience the future of document interaction with our lens-based AI technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Eye className="w-10 h-10" />,
                title: "Lens Mode",
                description: "Activate intelligent analysis by holding Alt and hovering over any content",
                gradient: "from-blue-500 to-cyan-500",
                glowColor: "shadow-blue-500/25"
              },
              {
                icon: <FileText className="w-10 h-10" />,
                title: "Smart Summarization",
                description: "Get concise, intelligent summaries of any text content in seconds",
                gradient: "from-green-500 to-emerald-500",
                glowColor: "shadow-green-500/25"
              },
              {
                icon: <BarChart3 className="w-10 h-10" />,
                title: "Content Visualization",
                description: "Transform complex information into clear, visual representations",
                gradient: "from-purple-500 to-pink-500",
                glowColor: "shadow-purple-500/25"
              },
              {
                icon: <Search className="w-10 h-10" />,
                title: "Similarity Detection",
                description: "Find related content and connections across your documents",
                gradient: "from-orange-500 to-red-500",
                glowColor: "shadow-orange-500/25"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className={`relative p-8 h-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl ${feature.glowColor} hover:bg-white/10`}>
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-lg`}></div>
                  
                  <div className={`relative inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
            </div>

                  <h3 className="relative text-2xl font-bold text-white mb-4 group-hover:text-white transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="relative text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
          </section>

      {/* How It Works Section */}
      <section className="relative py-32">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              How AsterAI Works
            </h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              Three simple steps to unlock the power of intelligent document analysis
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Activate Lens Mode",
                description: "Hold the Alt key to activate our intelligent overlay system that detects interactive content",
                icon: <Eye className="w-12 h-12" />,
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                step: "02",
                title: "Select Content",
                description: "Hover over any text, image, or section to see available analysis options appear instantly",
                icon: <Target className="w-12 h-12" />,
                gradient: "from-purple-500 to-pink-500"
              },
              {
                step: "03",
                title: "Get AI Insights",
                description: "Click on analysis options to get summaries, visualizations, or find similar content",
                icon: <Brain className="w-12 h-12" />,
                gradient: "from-orange-500 to-red-500"
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="text-center group"
              >
                <div className="relative mb-8">
                  {/* Main icon container */}
                  <div className={`relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br ${step.gradient} text-white rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500`}>
                    {step.icon}
                    
                    {/* Glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 scale-150`}></div>
                  </div>
                  
                  {/* Step number badge */}
                  <div className="absolute -top-3 -right-3 bg-white text-black font-bold text-lg px-3 py-1 rounded-full border-4 border-black shadow-lg">
                    {step.step}
              </div>

                  {/* Connection line (not for last item) */}
                  {index < 2 && (
                    <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-white/20 to-transparent transform translate-x-8"></div>
                  )}
                </div>

                <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-white transition-colors duration-300">
                  {step.title}
                </h3>
                
                <p className="text-neutral-400 leading-relaxed max-w-sm mx-auto group-hover:text-neutral-300 transition-colors duration-300 text-lg">
                  {step.description}
                </p>
              </motion.div>
            ))}
                </div>
              </div>
          </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-indigo-900/30"></div>
        <div className="absolute inset-0 bg-black/40"></div>
        
        
        <div className="relative max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Ready to Transform Your
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Document Analysis?
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-neutral-300 mb-12 leading-relaxed max-w-4xl mx-auto">
              Experience the future of intelligent content interaction. Try our demo and see how AsterAI can revolutionize your workflow with cutting-edge AI technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/demo">
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Zap className="w-6 h-6 relative z-10" />
                  <span className="relative z-10">Try Interactive Demo</span>
                  <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </Link>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-4 text-neutral-400"
              >
                <div className="flex items-center gap-2">
                  <Infinity className="w-5 h-5 text-blue-400" />
                  <span>Free to try</span>
                </div>
                <div className="w-1 h-1 bg-neutral-600 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  <span>No setup required</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
                  Aster
                </span>
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  AI
                </span>
              </h3>
              
              <p className="text-neutral-400 mb-8 text-lg max-w-2xl mx-auto">
                Revolutionizing document analysis with intelligent AI technology. 
                Experience the future of content interaction.
              </p>
              
              <div className="flex justify-center items-center space-x-8 text-sm text-neutral-500 mb-8">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  <span>Built with Next.js</span>
                </div>
                <div className="w-1 h-1 bg-neutral-700 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Powered by xAI</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>

    </div>
  )
}