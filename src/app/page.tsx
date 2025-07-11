import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Logo } from '@/components/logo';
import { homePageConfig } from '@/config/homepage';
import { FaArrowRight } from 'react-icons/fa';

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
    <Card className="text-center bg-card hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-in-out">
      <CardHeader>
        <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit mb-4">
          <Icon className="h-6 w-6" />
        </div>
        <CardTitle className="font-headline">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="py-12 sm:py-16 md:py-20 px-4">
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center items-center animate-fade-in-up order-first lg:order-last lg:pl-12">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-full blur-3xl -z-10"></div>
                <Logo className="h-40 w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 text-primary" />
              </div>
            </div>
            <div className="animate-fade-in-up text-center lg:text-left lg:pt-8 lg:pl-12">
              <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-center lg:text-left mb-6">
                {homePageConfig.hero.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 text-center lg:text-left mb-10">
                {homePageConfig.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
                <Button asChild size="lg">
                  <Link href={homePageConfig.hero.buttons.getStarted.href}>
                    {homePageConfig.hero.buttons.getStarted.label} <FaArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href={homePageConfig.hero.buttons.github.href}>
                    {homePageConfig.hero.buttons.github.label}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 px-4">
          <div className="container mx-auto">
            <h2 className="font-headline text-4xl font-bold text-center mb-16">
              {homePageConfig.features.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {homePageConfig.features.items.map((feature) => (
                <FeatureCard 
                  key={feature.title}
                  icon={feature.icon} 
                  title={feature.title} 
                  description={feature.description} 
                />
              ))}
            </div>
          </div>
        </section>

        <section id="cta" className="py-20 px-4">
          <div className="container mx-auto">
            <div className="bg-card rounded-xl p-10 md:p-16 text-center shadow-lg border">
              <h2 className="font-headline text-4xl font-bold mb-4">
                {homePageConfig.cta.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
                {homePageConfig.cta.description}
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Button asChild size="lg">
                  <Link href={homePageConfig.cta.buttons.docs.href}>
                    {homePageConfig.cta.buttons.docs.label}
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href={homePageConfig.cta.buttons.github.href}>
                    {homePageConfig.cta.buttons.github.label}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
