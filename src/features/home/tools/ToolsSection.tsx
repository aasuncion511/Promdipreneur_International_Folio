import { alsoFamiliar, toolGroups } from '@/content/tools'
import './tools.css'

/**
 * Toolbox: the tools, grouped by the job they do in a project. Each logo sits on a raised paper key
 * (the same light ground in both themes, so multicolour marks keep their colours) with its name
 * visible beside it. Secondary to the work on purpose: it comes after the projects and experience.
 */
export function ToolsSection() {
  return (
    <section id="tools" className="tl" aria-labelledby="tl-title">
      <header>
        <p className="wk-eyebrow">Toolbox</p>
        <h2 id="tl-title" className="wk-title">
          <span>Process first.</span> <span className="wk-title__bold">Then the tools.</span>
        </h2>
        <p className="tl__lede">I pick tools after the workflow is mapped, and prefer the ones a client already pays for.</p>
      </header>

      <ul className="tl__groups">
        {toolGroups.map((group) => (
          <li key={group.id} className="tl__group">
            <h3>{group.title}</h3>
            <p>{group.use}</p>
            <ul className="tl__keys">
              {group.tools.map((tool, i) => (
                <li key={tool.name} className="tl__key" style={{ ['--i' as string]: i }}>
                  <span className="tl__mark" aria-hidden>
                    <img src={tool.logo} alt="" width={28} height={28} loading="lazy" decoding="async" />
                  </span>
                  <span className="tl__name">{tool.name}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <p className="tl__also">
        <span>Also familiar with</span>
        {alsoFamiliar.map((tool) => (
          <span key={tool.name} className="tl__also-item">
            <img src={tool.logo} alt="" width={18} height={18} loading="lazy" decoding="async" />
            {tool.name}
          </span>
        ))}
      </p>
      <p className="tl__fine">Logos name the tools I work in. They do not imply certification, endorsement or partnership.</p>
    </section>
  )
}
