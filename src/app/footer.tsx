import { IconOwl } from '../components/ui/icon-owl'
import { Paragraph } from '../components/ui/paragraph'

export function Footer() {
  return (
    <footer className="grid gap-6 bg-linear-to-t from-stone-950 to-stone-900 p-12 text-sm font-light">
      <div className="flex justify-center gap-4">
        <Paragraph>Licence : MIT</Paragraph>
        <div className="opacity-50">/</div>
        <Paragraph>Author : Shuunen</Paragraph>
        <div className="opacity-50">/</div>
        <a className="underline" href="https://github.com/Shuunen/logo-tester" rel="noreferrer" target="_blank">
          Sources on GitHub
        </a>
      </div>
      <IconOwl className="mx-auto size-16 opacity-10" />
    </footer>
  )
}
