import { createFileRoute } from '@tanstack/react-router'
import Markdown from 'react-markdown'
import { Footer } from '~/components/Footer'

const content = `# PRIVACY POLICY

Last updated: Dec 7, 2024

We prefer not to collect any personal data unless it improves your experience of using the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.

## Collecting and Using Your Personal Data
### Types of Data Collected
#### Usage Data
Usage Data is collected automatically when using the Service. Data may include information such:
* analytic info like pages you visit and time spent plus, your country
* diagnostic info like browser type, device type and actions leading to error

#### Social Media Login
The Service allows social media login through:
* Google
* Spotify

We will gather Your:
* email

#### Cookies
Cookies are used for login and configuration purposes. Disabling any cookie will break some functionality of the Service.

### Personal Data Usage
You Personal Data will be used:
* To log into our service
* To monitor usage and data analytics
* To contact You

### Personal Data Retention
Your Personal Data will be retained as long as your account is active.

### Personal Data Transfer
Personal Data may be processed outside of Your state and country where the data protection laws may differ. By using our services, you agree to transfer data to use our services.

### Deleting Personal Data
You can delete your account and personal data along with it. As we collect minimal personal data, this will prevent you from accessing our services.

### Personal Data Security
Your personal information will be stored in an encrypted database. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.

## Links to Other Websites
Our Service link to third party websites. We have no control over, thus no responsibility over third party content content, privacy policies or practices of any third party sites or services.

## Privacy Policy Changes
This Privacy Policy is subject to change. You will be notified by email for any major changes.

## Contact
For questions about this Privacy Policy, contact us at support@musidi.org
`

export const Route = createFileRoute('/legal/privacy')({
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
