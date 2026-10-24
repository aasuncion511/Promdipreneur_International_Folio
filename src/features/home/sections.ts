import type { ComponentType } from 'react'
import { AboutSection } from './about/AboutSection'
import { HeroSection } from './hero/HeroSection'
import { AutomationSection } from './automation/AutomationSection'
import { ManifestoSection } from './manifesto/ManifestoSection'
import { ServicesSection } from './services/ServicesSection'
import { WorkSection } from './work/WorkSection'
import { ToolsSection } from './tools/ToolsSection'
import { ContactSection } from '@/features/contact/ContactPage'

/**
 * The Home page, in scroll order. Add a section = build it in its own folder (component + css +
 * scene, copy from src/content) and add one line here. Delete a section = remove its line.
 * Each section renders its own <section id> so it can be linked to with /#<id>.
 */
export type HomeSection = { id: string; Component: ComponentType }

export const homeSectionList: HomeSection[] = [
  { id: 'hero', Component: HeroSection },
  // Proof straight after the promise: the five projects, then the problem they solve and an example workflow.
  { id: 'work', Component: WorkSection },
  { id: 'manifesto', Component: ManifestoSection },
  { id: 'automation', Component: AutomationSection },
  { id: 'about', Component: AboutSection },
  { id: 'services', Component: ServicesSection },
  { id: 'tools', Component: ToolsSection },
  // Contact is the last section. /contact stays a page too.
  { id: 'contact', Component: ContactSection },
]
