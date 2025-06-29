'use client';

import { ThemeToggle } from '@/contexts/infrastructure/ui/theme-toggle';
import { Button } from '@/shared/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/shared/components/card';
import { Avatar, AvatarImage, AvatarFallback, AvatarGroup } from '@/shared/components/avatar';
import { 
  Animated, 
  Reveal, 
  ScaleOnHover, 
  Stagger, 
  Floating,
  Pulse,
  motion 
} from '@/shared/components/motion';
import { 
  Modal,
  ModalTrigger,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalContent,
  ModalFooter,
  SimpleModal
} from '@/shared/components/modal';
import { useState } from 'react';
import Link from 'next/link';

export default function DesignSystemPage() {
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);

  return (
    <div className="min-h-screen">
      <motion.header 
        className="glass sticky top-0 z-50 border-b"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Animated animation="fadeInLeft">
            <h1 className="text-2xl font-bold gradient-text">Design System</h1>
          </Animated>
          <Animated animation="fadeInRight">
            <div className="flex items-center gap-4">
              <Link href="/" className="hover:underline transition-colors hover:text-primary">Home</Link>
              <ThemeToggle />
            </div>
          </Animated>
        </div>
      </motion.header>

      <main className="container mx-auto p-8 space-y-12">
        {/* Typography */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold">Typography</h2>
          <div className="space-y-2">
            <h1 className="text-5xl font-extrabold">Heading 1</h1>
            <h2 className="text-4xl font-bold">Heading 2</h2>
            <h3 className="text-3xl font-semibold">Heading 3</h3>
            <h4 className="text-2xl font-medium">Heading 4</h4>
            <p className="text-lg">Body text large</p>
            <p>Body text regular</p>
            <p className="text-sm text-muted-foreground">Small muted text</p>
          </div>
        </section>

        {/* Avatar Components */}
        <section className="space-y-4">
          <Reveal>
            <h2 className="text-3xl font-bold">Avatar Components</h2>
          </Reveal>
          
          <div className="space-y-8">
            {/* Avatar Sizes */}
            <Card>
              <CardHeader>
                <CardTitle>Avatar Sizes</CardTitle>
                <CardDescription>Different avatar size variants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar size="xs">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback>XS</AvatarFallback>
                  </Avatar>
                  <Avatar size="sm">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <Avatar size="md">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback>MD</AvatarFallback>
                  </Avatar>
                  <Avatar size="lg">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback>LG</AvatarFallback>
                  </Avatar>
                  <Avatar size="xl">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback>XL</AvatarFallback>
                  </Avatar>
                  <Avatar size="2xl">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback>2XL</AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
            </Card>

            {/* Avatar with Status */}
            <Card>
              <CardHeader>
                <CardTitle>Avatar Status Indicators</CardTitle>
                <CardDescription>Avatars with different status indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <Avatar size="lg" showStatus status="online" animate>
                      <AvatarImage src="https://github.com/shadcn.png" alt="Online" />
                      <AvatarFallback>ON</AvatarFallback>
                    </Avatar>
                    <p className="text-sm mt-2">Online</p>
                  </div>
                  <div className="text-center">
                    <Avatar size="lg" showStatus status="away">
                      <AvatarImage src="https://github.com/shadcn.png" alt="Away" />
                      <AvatarFallback>AW</AvatarFallback>
                    </Avatar>
                    <p className="text-sm mt-2">Away</p>
                  </div>
                  <div className="text-center">
                    <Avatar size="lg" showStatus status="busy">
                      <AvatarImage src="https://github.com/shadcn.png" alt="Busy" />
                      <AvatarFallback>BS</AvatarFallback>
                    </Avatar>
                    <p className="text-sm mt-2">Busy</p>
                  </div>
                  <div className="text-center">
                    <Avatar size="lg" showStatus status="offline">
                      <AvatarImage src="https://github.com/shadcn.png" alt="Offline" />
                      <AvatarFallback>OF</AvatarFallback>
                    </Avatar>
                    <p className="text-sm mt-2">Offline</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Avatar Group */}
            <Card>
              <CardHeader>
                <CardTitle>Avatar Groups</CardTitle>
                <CardDescription>Grouped avatars with overflow counter</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Tight Spacing</p>
                  <AvatarGroup max={4} spacing="tight">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>U1</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarImage src="https://github.com/vercel.png" />
                      <AvatarFallback>U2</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarFallback>U3</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarFallback>U4</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarFallback>U5</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarFallback>U6</AvatarFallback>
                    </Avatar>
                  </AvatarGroup>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Normal Spacing with Status</p>
                  <AvatarGroup max={5} spacing="normal" size="lg">
                    <Avatar size="lg" showStatus status="online" animate>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>U1</AvatarFallback>
                    </Avatar>
                    <Avatar size="lg" showStatus status="away">
                      <AvatarImage src="https://github.com/vercel.png" />
                      <AvatarFallback>U2</AvatarFallback>
                    </Avatar>
                    <Avatar size="lg" showStatus status="online" animate>
                      <AvatarFallback>U3</AvatarFallback>
                    </Avatar>
                    <Avatar size="lg">
                      <AvatarFallback>U4</AvatarFallback>
                    </Avatar>
                    <Avatar size="lg">
                      <AvatarFallback>U5</AvatarFallback>
                    </Avatar>
                    <Avatar size="lg">
                      <AvatarFallback>U6</AvatarFallback>
                    </Avatar>
                    <Avatar size="lg">
                      <AvatarFallback>U7</AvatarFallback>
                    </Avatar>
                  </AvatarGroup>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Colors */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold">Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-20 rounded-lg bg-primary"></div>
              <p className="text-sm font-medium">Primary</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 rounded-lg bg-secondary"></div>
              <p className="text-sm font-medium">Secondary</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 rounded-lg bg-accent"></div>
              <p className="text-sm font-medium">Accent</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 rounded-lg bg-muted"></div>
              <p className="text-sm font-medium">Muted</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 rounded-lg bg-destructive"></div>
              <p className="text-sm font-medium">Destructive</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 rounded-lg bg-success"></div>
              <p className="text-sm font-medium">Success</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 rounded-lg bg-warning"></div>
              <p className="text-sm font-medium">Warning</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 rounded-lg border bg-background"></div>
              <p className="text-sm font-medium">Background</p>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold">Buttons</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="sm">Small</Button>
              <Button>Default</Button>
              <Button size="lg">Large</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button disabled>Disabled</Button>
              <Button className="animate-pulse">Loading...</Button>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold">Cards</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Simple Card</CardTitle>
                <CardDescription>A basic card component</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card content goes here</p>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>Interactive Card</CardTitle>
                <CardDescription>Hover to see effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This card lifts on hover</p>
              </CardContent>
              <CardFooter>
                <Button size="sm">Action</Button>
              </CardFooter>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle>Glass Card</CardTitle>
                <CardDescription>With glassmorphism effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Modern glass effect</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Badges */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold">Badges</h2>
          <div className="flex flex-wrap gap-4">
            <span className="badge badge-primary">Primary</span>
            <span className="badge badge-secondary">Secondary</span>
            <span className="badge badge-outline">Outline</span>
            <span className="badge bg-success text-success-foreground">Success</span>
            <span className="badge bg-warning text-warning-foreground">Warning</span>
            <span className="badge bg-destructive text-destructive-foreground">Destructive</span>
          </div>
        </section>

        {/* Forms */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold">Forms</h2>
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Form Elements</CardTitle>
              <CardDescription>Input components and form controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="label">Email</label>
                <input type="email" className="input" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <label className="label">Password</label>
                <input type="password" className="input" placeholder="Enter password" />
              </div>
              <div className="space-y-2">
                <label className="label">Message</label>
                <textarea className="input min-h-[100px]" placeholder="Type your message..." />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Submit</Button>
            </CardFooter>
          </Card>
        </section>

        {/* Animations */}
        <section className="space-y-4">
          <Reveal>
            <h2 className="text-3xl font-bold">Animations</h2>
          </Reveal>
          
          <div className="space-y-8">
            {/* Basic Animations */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Basic Animations</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <Animated animation="fadeInUp">
                  <Card>
                    <CardHeader>
                      <CardTitle>Fade In Up</CardTitle>
                    </CardHeader>
                  </Card>
                </Animated>
                <Animated animation="fadeInDown" delay={0.1}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Fade In Down</CardTitle>
                    </CardHeader>
                  </Card>
                </Animated>
                <Animated animation="fadeInLeft" delay={0.2}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Fade In Left</CardTitle>
                    </CardHeader>
                  </Card>
                </Animated>
                <Animated animation="fadeInRight" delay={0.3}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Fade In Right</CardTitle>
                    </CardHeader>
                  </Card>
                </Animated>
              </div>
            </div>

            {/* Advanced Animations */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Advanced Animations</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Animated animation="scaleIn" transition="bounce">
                  <Card>
                    <CardHeader>
                      <CardTitle>Scale Bounce</CardTitle>
                    </CardHeader>
                  </Card>
                </Animated>
                <Animated animation="rotateIn">
                  <Card>
                    <CardHeader>
                      <CardTitle>Rotate In</CardTitle>
                    </CardHeader>
                  </Card>
                </Animated>
                <Animated animation="flipIn">
                  <Card>
                    <CardHeader>
                      <CardTitle>Flip In</CardTitle>
                    </CardHeader>
                  </Card>
                </Animated>
              </div>
            </div>

            {/* Interactive Animations */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Interactive Animations</h3>
              <div className="flex gap-4 flex-wrap">
                <ScaleOnHover>
                  <Card className="w-48">
                    <CardHeader>
                      <CardTitle>Hover Scale</CardTitle>
                    </CardHeader>
                  </Card>
                </ScaleOnHover>
                <Floating>
                  <Card className="w-48">
                    <CardHeader>
                      <CardTitle>Floating</CardTitle>
                    </CardHeader>
                  </Card>
                </Floating>
                <Pulse>
                  <Card className="w-48">
                    <CardHeader>
                      <CardTitle>Pulse</CardTitle>
                    </CardHeader>
                  </Card>
                </Pulse>
              </div>
            </div>

            {/* Stagger Animation */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Stagger Animation</h3>
              <Stagger className="grid md:grid-cols-6 gap-2">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Animated key={item} animation="scaleIn" transition="bounce">
                    <Card>
                      <CardContent className="flex items-center justify-center h-20">
                        <span className="text-2xl font-bold">{item}</span>
                      </CardContent>
                    </Card>
                  </Animated>
                ))}
              </Stagger>
            </div>
          </div>
        </section>

        {/* Modal Components */}
        <section className="space-y-4">
          <Reveal>
            <h2 className="text-3xl font-bold">Modal Components</h2>
          </Reveal>
          
          <Card>
            <CardHeader>
              <CardTitle>Modal Variants</CardTitle>
              <CardDescription>Different modal sizes, positions, and styles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                {/* Basic Modal */}
                <Modal open={openModal} onOpenChange={setOpenModal}>
                  <ModalTrigger asChild>
                    <Button>Open Basic Modal</Button>
                  </ModalTrigger>
                  <ModalHeader>
                    <ModalTitle>Basic Modal</ModalTitle>
                    <ModalDescription>
                      This is a basic modal with default settings
                    </ModalDescription>
                  </ModalHeader>
                  <ModalContent>
                    <p>Modal content goes here. You can add any React components.</p>
                  </ModalContent>
                  <ModalFooter>
                    <Button variant="outline" onClick={() => setOpenModal(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setOpenModal(false)}>
                      Save Changes
                    </Button>
                  </ModalFooter>
                </Modal>

                {/* Large Modal */}
                <Modal open={openModal2} onOpenChange={setOpenModal2} size="2xl">
                  <ModalTrigger asChild>
                    <Button variant="outline">Open Large Modal</Button>
                  </ModalTrigger>
                  <ModalHeader>
                    <ModalTitle>Large Modal</ModalTitle>
                    <ModalDescription>
                      This modal has a larger size (2xl)
                    </ModalDescription>
                  </ModalHeader>
                  <ModalContent>
                    <div className="space-y-4">
                      <p>This modal has more space for content.</p>
                      <Card>
                        <CardHeader>
                          <CardTitle>Nested Card</CardTitle>
                          <CardDescription>You can nest other components</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>Card content inside a modal</p>
                        </CardContent>
                      </Card>
                    </div>
                  </ModalContent>
                  <ModalFooter>
                    <Button variant="outline" onClick={() => setOpenModal2(false)}>
                      Close
                    </Button>
                  </ModalFooter>
                </Modal>

                {/* Top Position Modal */}
                <Modal 
                  open={openModal3} 
                  onOpenChange={setOpenModal3} 
                  position="top-center"
                  size="lg"
                >
                  <ModalTrigger asChild>
                    <Button variant="secondary">Top Position Modal</Button>
                  </ModalTrigger>
                  <ModalHeader>
                    <ModalTitle>Top Positioned Modal</ModalTitle>
                    <ModalDescription>
                      This modal appears at the top of the viewport
                    </ModalDescription>
                  </ModalHeader>
                  <ModalContent>
                    <p>Perfect for notifications or less intrusive dialogs.</p>
                  </ModalContent>
                  <ModalFooter>
                    <Button onClick={() => setOpenModal3(false)}>
                      Got it
                    </Button>
                  </ModalFooter>
                </Modal>

                {/* Simple Modal */}
                <SimpleModal
                  title="Simple Modal"
                  description="Using the SimpleModal component for quick dialogs"
                  content={
                    <div className="space-y-2">
                      <p>This is a simplified API for common modal patterns.</p>
                      <p>Just pass title, description, content, and footer props.</p>
                    </div>
                  }
                  footer={
                    <>
                      <Button variant="outline">Cancel</Button>
                      <Button>Confirm</Button>
                    </>
                  }
                  trigger={<Button variant="destructive">Simple Modal</Button>}
                />
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Features:</strong> Portal rendering, focus trap, keyboard navigation (ESC to close), 
                  animated transitions, customizable sizes and positions, overlay click to close (optional).
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Utilities */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold">Utilities</h2>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="gradient-text">Gradient Text</CardTitle>
                <CardDescription>Beautiful gradient text effect</CardDescription>
              </CardHeader>
            </Card>
            <div className="flex gap-4">
              <div className="skeleton h-12 w-32"></div>
              <div className="skeleton h-12 w-48"></div>
              <div className="skeleton h-12 w-24"></div>
            </div>
          </div>
        </section>

        {/* Spacing */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold">Spacing Scale</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="text-sm font-mono w-20">xs (4px)</span>
              <div className="h-4 bg-primary" style={{ width: '1rem' }}></div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-mono w-20">sm (8px)</span>
              <div className="h-4 bg-primary" style={{ width: '2rem' }}></div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-mono w-20">md (16px)</span>
              <div className="h-4 bg-primary" style={{ width: '4rem' }}></div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-mono w-20">lg (24px)</span>
              <div className="h-4 bg-primary" style={{ width: '6rem' }}></div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-mono w-20">xl (32px)</span>
              <div className="h-4 bg-primary" style={{ width: '8rem' }}></div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-mono w-20">2xl (48px)</span>
              <div className="h-4 bg-primary" style={{ width: '12rem' }}></div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-mono w-20">3xl (64px)</span>
              <div className="h-4 bg-primary" style={{ width: '16rem' }}></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}