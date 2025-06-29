'use client';

import { ThemeToggle } from '@/contexts/infrastructure/ui/theme-toggle';
import { Button } from '@/shared/components/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/components/card';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Users, BookOpen, Trophy, Sparkles, CheckCircle2, Star } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/shared/components/avatar';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-background via-background to-muted/20">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        </div>

        {/* Navigation */}
        <header className="relative z-50 border-b backdrop-blur-sm bg-background/80">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">Classroom</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/courses" className="text-sm hover:text-primary transition-colors">
                Courses
              </Link>
              <Link href="/instructors" className="text-sm hover:text-primary transition-colors">
                Instructors
              </Link>
              <Link href="/pricing" className="text-sm hover:text-primary transition-colors">
                Pricing
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button variant="ghost" size="sm">Sign In</Button>
              <Button size="sm">Get Started</Button>
            </div>
          </div>
        </header>

        {/* Hero Content */}
        <section className="relative container mx-auto px-4 py-16 md:py-24">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Welcome to the future of learning</span>
            </div>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Master New Skills
              <span className="block text-primary">Transform Your Career</span>
            </h1>
            
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Join thousands of learners in our interactive courses designed by industry experts. 
              Learn at your own pace with real-world projects.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="gap-2">
                <Play className="h-4 w-4" />
                Start Learning Free
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                Browse Courses
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Social Proof */}
            <div className="mt-12 flex items-center justify-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <Avatar key={i} className="h-10 w-10 border-2 border-background">
                    <AvatarImage src={`https://i.pravatar.cc/40?img=${i}`} alt={`Student ${i}`} />
                    <AvatarFallback>S{i}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold">50,000+</span> happy students
                </p>
              </div>
            </div>
          </motion.div>
        </section>
      </div>

      {/* Stats Section */}
      <section className="border-y bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { label: 'Active Students', value: '50K+', icon: Users },
              { label: 'Expert Instructors', value: '200+', icon: Trophy },
              { label: 'Course Hours', value: '5000+', icon: Play },
              { label: 'Completion Rate', value: '94%', icon: CheckCircle2 },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <Icon className="mx-auto mb-2 h-8 w-8 text-primary" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Why Choose Classroom
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Experience a revolutionary approach to online learning
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'Interactive Learning',
                description: 'Engage with live coding environments and real-time collaboration',
                icon: BookOpen,
                color: 'text-blue-500',
              },
              {
                title: 'Expert Mentorship',
                description: 'Get personalized guidance from industry professionals',
                icon: Users,
                color: 'text-primary',
              },
              {
                title: 'Career Growth',
                description: 'Build a portfolio and connect with top employers',
                icon: Trophy,
                color: 'text-amber-500',
              },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <Icon className={`mb-4 h-12 w-12 ${feature.color}`} />
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Start Your Journey?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
            Join our community and unlock your potential with world-class education
          </p>
          <Button size="lg" className="gap-2">
            Get Started for Free
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold">Classroom</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Classroom. Built with Next.js 15 & TypeScript.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}