import { Link, createFileRoute } from '@tanstack/react-router'
import type { JSXElementConstructor, ReactElement } from 'react'
import { Footer } from '~/components/Footer'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import GridPattern from '~/components/ui/grid-pattern'
import { cn } from '~/lib/utils'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-4">
      <Hero />
      <div className="space-y-24 sm:space-y-32">
        <ShowcaseSection />
        <ReviewSection />
        <PriceSection />
      </div>
      <Footer />
    </div>
  )
}

const Hero = () => {
  return (
    <main id="search" className="flex flex-col items-center">
      <section className=" relative w-full contain space-y-8 py-36 flex flex-col items-center">
        <GridPattern
          squares={[
            [4, 4],
            [5, 1],
            [8, 2],
            [5, 3],
            [5, 5],
            [10, 10],
            [12, 15],
            [8, 10],
            [7, 15],
          ]}
          width={24}
          height={24}
          strokeDasharray={'4 4'}
          className={cn(
            '-z-10 [mask-image:linear-gradient(to_top,transparent,white,transparent)] ',
          )}
        />
        <div className="space-y-8">
          <h1 className="font-semibold text-4xl md:text-6xl text-center px-9">
            Fastest Piano Transcriber
          </h1>
          <div className="flex justify-center bg-transparent">
            <Link
              to="/app/transcribe"
              className="p-3 bg-accent hover:bg-foreground rounded-[1.8rem] md:rounded-[2.4rem] border-foreground border"
            >
              <button
                type="button"
                className="font-semibold text-background bg-foreground text-2xl md:text-3xl px-6 py-3 md:px-8 md:py-4 rounded-[1rem] md:rounded-[1.6rem]"
              >
                <p>TRANSCRIBE</p>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

const leftVideo = '/left.mp4'
const rightVideo = '/right.mp4'

const Video: JSXElementConstructor<{ className?: string; src: string }> = (props) => {
  return <video autoPlay loop muted playsInline src={props.src} className={props.className} />
}

const ShowcaseSection = () => {
  return (
    <section>
      <div className="flex flex-col items-center contain space-y-4">
        <div>
          <h2 className="text-xl font-bold text-center">Speedy insight</h2>
          <p className="text-center">🚀 What'd they play? You'll know in a minute!</p>
        </div>
        <Card className="w-full max-w-screen-lg overflow-hidden flex">
          <Video src={leftVideo} className="w-1/2 aspect-video grayscale contrast-125" />
          <Video src={rightVideo} className="w-1/2 aspect-video" />
        </Card>
      </div>
    </section>
  )
}

const ReviewCard: JSXElementConstructor<{
  userName: string
  avatar: string
  content: string
  link: string
}> = ({ userName, avatar, content, link }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row gap-6">
        <Avatar className="h-10 w-10 border-4 my-auto">
          <AvatarImage className="bg-white" loading="lazy" alt="profile picture" src={avatar} />
          <AvatarFallback>{userName.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <a href={link} className="underline" target="blank">
          {userName}
        </a>
      </CardHeader>
      <CardContent className="text-wrap italic text-ellipsis">
        <CardDescription>"{content}"</CardDescription>
      </CardContent>
    </Card>
  )
}

import DiscordLuan from '~/assets/avatar/DiscordLuan.webp'
import RedditAmarytha from '~/assets/avatar/RedditAmarytha.webp'
import RedditJomnschh from '~/assets/avatar/RedditJomnschh.png'

// biome-ignore lint/complexity/noBannedTypes: <explanation>
const ReviewSection: JSXElementConstructor<{}> = () => {
  return (
    <section id="review">
      <div className="flex flex-col contain space-y-4">
        <div>
          <h2 className="text-xl font-bold text-center">Grow together</h2>
          <p className="text-center">🤓 Find like minded communities.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 max-w-screen-lg self-center">
          <ReviewCard
            userName="Amarytha"
            avatar={RedditAmarytha}
            content="I just tried like 6 different services, some paid some free, and by god musidi gave me exactly what I wanted in record speed. Thank you so much <3."
            link="https://www.reddit.com/r/transcribe/comments/10wamd8/comment/kxm7p3t"
          />
          <ReviewCard
            userName="Luan"
            avatar={DiscordLuan}
            content="I used Musidi and I was really impressed by how well it works... I wanted to make it easier to arrange a piano song and it is really helpful for that."
            link="https://discord.com/channels/1251902487149936731/1251924578494709822/1252571641024876565"
          />
          <ReviewCard
            userName="Jomnschh"
            avatar={RedditJomnschh}
            content="bro holy sh* musidi is literally perfect, great find tysm... it can transcribe so fast and accurate I think it's better than any other transcribing service."
            link="https://www.reddit.com/r/transcribe/comments/10wamd8/comment/kxm7p3t"
          />
        </div>
      </div>
    </section>
  )
}

const PriceCard: JSXElementConstructor<{
  title: string
  price: string
  features: string[]
  children?: ReactElement
}> = (props) => {
  return (
    <Card className="w-full">
      <div className="hidden md:flex flex-col justify-between h-full">
        <div>
          <CardHeader>
            <CardTitle>{props.title}</CardTitle>
            <p>{props.price}</p>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <ul className="list-disc pl-4">
                {props.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </CardDescription>
          </CardContent>
        </div>
        <CardFooter>{props.children}</CardFooter>
      </div>
      <div className="md:hidden grid grid-cols-2">
        <CardHeader className="w-full">
          <div className="text-center">
            <CardTitle>{props.title}</CardTitle>
            <p>{props.price}</p>
          </div>
          <div className="h-full" />
          {props.children}
        </CardHeader>
        <CardContent className="p-6 pl-0">
          <CardDescription>
            <ul className="list-disc pl-4">
              {props.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </CardDescription>
        </CardContent>
      </div>
    </Card>
  )
}

const ActionButton: JSXElementConstructor<{
  href: string
  text: string
}> = ({ href, text }) => {
  return (
    <a href={href} className="w-full">
      <Button className="w-full border-foreground bg-foreground hover:bg-background hover:text-foreground border rounded-[0.5rem]">
        {text}
      </Button>
    </a>
  )
}

const PriceSection = () => {
  return (
    <section id="price">
      <div className="flex flex-col items-center contain space-y-4">
        <div className="text-center">
          <h2 className="text-xl font-bold">Supercharge your progress</h2>
          <p>⚡ Access more powerful tools.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4 w-full max-w-screen-lg">
          <PriceCard
            title="Community"
            price="Freebie"
            features={['Note visualiser', 'Discord chat', 'Community audio to MIDI']}
          />
          <PriceCard
            title="Premium"
            price="10 USD / month"
            features={[
              'Community plus',
              'MIDI download',
              'MIDI to sheet',
              '10 hours of audio to MIDI',
            ]}
          >
            <ActionButton
              href="https://docs.google.com/forms/d/e/1FAIpQLSe7kWNFZDw1jw2V7u8QbGxXXIHfx5yxKg_SjbSFtcsSY_7Otw/viewform?usp=sf_link"
              text="Waitlist"
            />
          </PriceCard>

          <PriceCard
            title="Professional"
            price="Custom"
            features={['Premium plus', 'Custom integrations', 'Over 100 hours of audio to MIDI']}
          >
            <ActionButton href="mailto:support@musidi.org" text="Contact" />
          </PriceCard>
        </div>
        <p className="text-center">Note: Fees are billed monthly.</p>
      </div>
    </section>
  )
}
