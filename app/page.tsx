"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import { TracingBeam } from "@/components/ui/tracing-beam"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import { 
  Zap, 
  Search, 
  FileText, 
  BarChart3, 
  ArrowRight,
  Sparkles,
  ChevronRight,
  Lightbulb,
  Layers,
  Infinity,
  MousePointer,
  Brain,
  Linkedin,
  Github,
  ExternalLink
} from "lucide-react"

export default function LandingPage() {
  // Ensure page always starts at the top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
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
                Built on xAI · v0
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
              className="text-xl md:text-2xl text-neutral-300 mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              Context right where your cursor is.
              <br />
              <span className="text-blue-400 font-medium">Hold ⌥ Option</span> to reveal the Lens and see the gist instantly.
            </motion.p>
            
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mb-12"
            >
              <p className="text-lg md:text-xl text-gray-400 font-semibold tracking-wide">
                Point. Press. Know.
              </p>
            </motion.div>
            
            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <Link href="/demo">
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="div"
                  className="bg-black dark:bg-black text-white flex items-center space-x-2 px-8 py-4 font-semibold text-lg"
                >
                  <span>Try the demo</span>
                  <ArrowRight className="w-5 h-5" />
                </HoverBorderGradient>
              </Link>
              
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                onClick={() => {
                  const howItWorksSection = document.querySelector('#how-it-works-section') || document.querySelector('section:nth-of-type(2)');
                  howItWorksSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-black dark:bg-black text-white flex items-center space-x-2 px-8 py-4 font-semibold text-lg"
              >
                <span>Learn more</span>
                <ChevronRight className="w-5 h-5" />
              </HoverBorderGradient>
            </motion.div>
            
            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-8 text-sm text-neutral-400"
            >
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                <span className="text-white">Precise</span>
              </div>
              <div className="w-1 h-1 bg-neutral-600 rounded-full"></div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                <span className="text-white">Fast</span>
              </div>
              <div className="w-1 h-1 bg-neutral-600 rounded-full"></div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                <span className="text-white">Trusted</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features-section" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Intelligent Document
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Analysis
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-neutral-300 mb-12 leading-relaxed max-w-4xl mx-auto">
              Experience the future of document interaction with our lens-based AI technology
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <FeaturesGrid />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works-section" className="relative py-32 bg-black">
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              How It Works
            </h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              Three simple steps to unlock the power of intelligent document analysis
            </p>
          </motion.div>

          <TracingBeam className="px-6">
            <div className="space-y-24">
              {[
                {
                  step: "01",
                  title: "Reveal the Lens",
                  description: "Hold ⌥ Option.",
                  symbol: "⌥"
                },
                {
                  step: "02", 
                  title: "Target",
                  description: "Hover over what matters.",
                  symbol: "→"
                },
                {
                  step: "03",
                  title: "Instant insight",
                  description: "Tap any button to see the gist.",
                  symbol: "✦"
                }
              ].map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
                    {/* Step indicator */}
                    <div className="relative flex-shrink-0">
                      {/* Clean circle with symbol */}
                      <div className="relative inline-flex items-center justify-center w-20 h-20 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                        <span className="text-3xl text-white/80 group-hover:text-white transition-colors duration-300">
                          {step.symbol}
                        </span>
                      </div>
                      
                      {/* Minimal step number */}
                      <div className="absolute -top-2 -right-2 bg-white/10 border border-white/20 text-white/60 font-medium text-sm px-2 py-1 rounded-lg backdrop-blur-sm">
                        {step.step}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3 group-hover:text-white transition-colors duration-300">
                        {step.title}
                      </h3>
                      
                      <p className="text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors duration-300 text-lg">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TracingBeam>
        </div>
      </section>

      {/* Meet The Team Section */}
      <section className="relative py-32 bg-black">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Meet The Team
            </h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Anirudh Venkatachalam",
                linkedin: "https://www.linkedin.com/in/anirudhvee/",
                github: "https://github.com/anirudhvee",
                label: "Favorite Quote",
                detail: "If you live each day as if it was your last, someday you'll most certainly be right - Steve Jobs",
                initials: "AV",
                photo: "/team/anirudh.jpg"
              },
              {
                name: "Manasvini Narayanan",
                linkedin: "https://www.linkedin.com/in/mana-nara/",
                github: "https://github.com/mana-nara",
                label: "Favorite Quote",
                detail: "You miss all the shots you don't take!",
                initials: "MN",
                photo: "/team/manasvini.jpg"
              },
              {
                name: "ManojBaasha",
                linkedin: "https://www.linkedin.com/in/manojelango/",
                github: "https://github.com/ManojBaasha",
                label: "Fun Fact",
                detail: "",
                initials: "MB",
                photo: "/team/manoj.jpg"
              },
              {
                name: "Toniya Patil",
                linkedin: "https://www.linkedin.com/in/toniya/",
                github: "https://github.com/tbpatil",
                label: "Superpower",
                detail: "",
                initials: "TP",
                photo: "/team/toniya.jpg"
              }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  {/* Avatar */}
                  <div className="flex justify-center mb-6">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden group-hover:scale-105 transition-transform duration-300">
                      <Image
                        src={member.photo}
                        alt={`${member.name} - AsterAI Team Member`}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          // Fallback to initials if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      {/* Fallback initials */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl hidden">
                        {member.initials}
                      </div>
                    </div>
                  </div>
                  
                  {/* Name */}
                  <h3 className="text-xl font-semibold text-white mb-2 text-center group-hover:text-white transition-colors duration-300">
                    {member.name}
                  </h3>
                  
                  {/* Personal Detail */}
                  <div className="text-center mb-6">
                    <p className="text-blue-400 text-xs font-medium mb-1 group-hover:text-blue-300 transition-colors duration-300 uppercase tracking-wide">
                      {member.label}
                    </p>
                    <p className="text-neutral-400 text-sm leading-relaxed group-hover:text-neutral-300 transition-colors duration-300">
                      {member.detail}
                    </p>
                  </div>
                  
                  {/* Social Links */}
                  <div className="flex justify-center gap-4">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group/link"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-10 h-10 bg-white/10 border border-white/20 rounded-lg text-white/80 hover:text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 group/link"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="about" className="relative py-32 bg-black overflow-hidden">
        
        
        <div className="relative max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Read less. Know more.
            </h2>
            
            <p className="text-xl md:text-2xl text-neutral-300 mb-12 leading-relaxed max-w-4xl mx-auto">
              Watch AsterAI turn dense pages into clear answers—without the busywork.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/demo">
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="div"
                  className="bg-black dark:bg-black text-white flex items-center space-x-3 px-10 py-5 font-bold text-xl"
                >
                  <Zap className="w-6 h-6" />
                  <span>Launch demo</span>
                  <ArrowRight className="w-6 h-6" />
                </HoverBorderGradient>
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
                  <span>No setup</span>
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
                A simpler way to understand what's on a page.
              </p>
              
              <div className="flex justify-center items-center space-x-8 text-sm text-neutral-500 mb-8">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  <span>Built with v0</span>
                </div>
                <div className="w-1 h-1 bg-neutral-700 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Powered by Grok</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>

    </div>
  )
}

function FeaturesGrid() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<MousePointer className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Lens Mode"
        description="<strong>Activate intelligent analysis</strong> by holding Alt and hovering over any content"
      />
 
      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<FileText className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Smart Summarization"
        description="<strong>Get concise, intelligent summaries</strong> of any text content in seconds"
      />
 
      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icon={<BarChart3 className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Content Visualization"
        description="<strong>Transform complex information</strong> into clear, visual representations"
      />
 
      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<Search className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="Similarity Detection"
        description="<strong>Find related content and connections</strong> across your documents"
      />
 
      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={<Brain className="h-4 w-4 text-black dark:text-neutral-400" />}
        title="AI-Powered Intelligence"
        description="<strong>Advanced machine learning models</strong> that understand context and meaning"
      />
    </ul>
  );
}
 
interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}
 
const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <motion.li 
      className={`min-h-[14rem] list-none ${area}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: Math.random() * 0.3 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="relative h-full rounded-2xl border border-gray-800 p-2 md:rounded-3xl md:p-3 hover:border-purple-500/50 transition-colors duration-300">
        <GlowingEffect
          blur={0}
          borderWidth={2}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-purple-500/30 bg-purple-500/10 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white">
                {title}
              </h3>
              <div className="font-sans text-sm/[1.125rem] text-black md:text-base/[1.375rem] dark:text-neutral-400 [&_strong]:text-white [&_strong]:font-semibold">
                <div dangerouslySetInnerHTML={{ __html: description as string }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.li>
  );
};

//hakuna matata