import { createFileRoute } from '@tanstack/react-router'
import Markdown from 'react-markdown'
import { Footer } from '~/components/Footer'

const content = `# TERMS OF SERVICE

Last updated Dec 7, 2024

Musidi operates the website [https://www.musidi.org](http://www.musidi.org).

## Intellectual Property 
We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services, as well as the trademarks, service marks, and logos. Our Content and Marks are protected by copyright and trademark laws.

## Registration
You may be required to register to use the Services. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate.

## Payment
We accept paryment through Stripe. Sales tax will be added to the price of purchases.

## Subscriptions
### Billing and renewal
Your subscription will continue and automatically renew unless canceled. You consent to our charging your payment method on a recurring basis without requiring your prior approval for each recurring charge, until such time as you cancel the applicable order. The length of your billing cycle is monthly.

### Cancellation
You can cancel your subscription at any time by logging into your account. Your cancellation will take effect at the end of the current paid term. If you have any questions or are unsatisfied with our Services, please email us at support@musidi.org. 

### Fee Changes
We may, from time to time, make changes to the subscription fee and will communicate any price changes to you in accordance with applicable law.

## Prohibited activities
You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.

As a user of the Services, you agree not to:
* Extract data without written permission from us.
* Trick, defraud, or mislead us and other users.
* Interfere with security-related features.
* Tarnish the Services.
* Upload viruses, Trojan horses.
* Engage in automated use of the system.
* Attempt to bypass restricted access.
* Copy the Services software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.

## User generated content
The Services does not offer users to submit or post content.

## Contribution
By submitting suggestions or other feedback regarding the Services, you agree that we can use and share such feedback for any purpose without compensation to you.

## Social media
You may use social media accounts for login purposes.

## Advertisers
We allow advertisers to display their advertisements and other information in certain areas of the Services, such as sidebar advertisements or banner advertisements. We simply provide the space to place such advertisements, and we have no other relationship with advertisers.

## Interruptions
We cannot guarantee the Services will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Services,

## Governing law
These Legal Terms shall be governed by and defined following the laws of Australia. Musidi and yourself irrevocably consent that the courts of Australia shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these Legal Terms.

## Disputes
To quickly resolve any disputes You must first attempt to negotiate any Dispute at least thirty (30) days before initiating arbitration. Such informal negotiations commence upon written notice from one Party to the other Party.

## Corrections
We may update the information on the Services at any time, without prior notice.

## User data
We may retain data transmitted to the Service. Although we perform regular data backups, You are responsible for the transmitted data. You agree that we are not liabile for any loss or corruption of Your data. Thus You hereby waive any right of action against us arising from any such loss or corruption of such data.

## Email communication
You consent to receiving email communication.

## Reasonable request rate
Users may not send too many requests to the server. A reasonable number is 10 request per second, which is still at the upper limit of human capability.

## Copyright
Users are responsible for copyright infringement. Due to the large database and server load required to perform copyright fingerprinting and comparison, this responsibility should reasonably fall onto the users.

## Free tier abuse
Free tier requires users to watch ads. Any attempt to tamper with ads will result in no rewards.

## Contact
For questions about this Privacy Policy, contact us at support@musidi.org
`

export const Route = createFileRoute('/legal/terms')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <main className="contain p-12">
        <Markdown className="markdown">{content}</Markdown>
      </main>
      <Footer />
    </>
  )
}
