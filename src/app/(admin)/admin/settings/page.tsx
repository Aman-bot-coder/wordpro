import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getSettings } from "@/lib/seo/repository";
import { saveSettingsAction } from "../actions";

export const dynamic = "force-dynamic";

const input =
  "mt-2 w-full rounded-lg border border-navy/15 bg-white px-3 py-2 text-sm text-navy outline-none focus:border-royal";
const label = "block text-sm font-medium text-navy";

export default async function SettingsPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");

  const settings = await getSettings();

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-navy">Site settings</h1>
      <p className="mt-1 text-sm text-gray-dark">
        Applied site-wide: canonicals, sitemap, robots.txt and the Organization schema.
      </p>

      <form action={saveSettingsAction} className="mt-8 max-w-2xl space-y-6">
        <section className="space-y-5 rounded-2xl border border-navy/10 bg-white p-6">
          <label className="block">
            <span className={label}>Site name</span>
            <input name="siteName" defaultValue={settings.siteName} className={input} />
          </label>
          <label className="block">
            <span className={label}>Base URL</span>
            <input name="baseUrl" defaultValue={settings.baseUrl} className={input} />
            <span className="mt-1 block text-xs text-gray-dark">
              Used for canonical URLs, sitemap and robots. No trailing slash.
            </span>
          </label>
          <label className="block">
            <span className={label}>Title template</span>
            <input name="titleTemplate" defaultValue={settings.titleTemplate} className={input} />
            <span className="mt-1 block text-xs text-gray-dark">
              <code className="font-mono">%s</code> is replaced by each page title.
            </span>
          </label>
          <label className="block">
            <span className={label}>Default description</span>
            <textarea
              name="defaultDescription"
              rows={3}
              defaultValue={settings.defaultDescription}
              className={input}
            />
          </label>
        </section>

        <section className="space-y-5 rounded-2xl border border-navy/10 bg-white p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-navy/50">Organization</h2>
          <label className="block">
            <span className={label}>Contact email</span>
            <input name="organizationEmail" defaultValue={settings.organizationEmail} className={input} />
          </label>
          <label className="block">
            <span className={label}>Twitter handle</span>
            <input name="twitterHandle" defaultValue={settings.twitterHandle} className={input} />
          </label>
          <label className="block">
            <span className={label}>Social profiles (one per line)</span>
            <textarea
              name="socialProfiles"
              rows={3}
              defaultValue={settings.socialProfiles.join("\n")}
              className={input}
            />
            <span className="mt-1 block text-xs text-gray-dark">
              Emitted as <code className="font-mono">sameAs</code> in Organization schema.
            </span>
          </label>
        </section>

        <section className="space-y-5 rounded-2xl border border-navy/10 bg-white p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-navy/50">
            Verification &amp; robots
          </h2>
          <label className="block">
            <span className={label}>Google Search Console token</span>
            <input name="googleVerification" defaultValue={settings.googleVerification ?? ""} className={input} />
          </label>
          <label className="block">
            <span className={label}>Bing Webmaster token</span>
            <input name="bingVerification" defaultValue={settings.bingVerification ?? ""} className={input} />
          </label>
          <label className="block">
            <span className={label}>Extra robots.txt rules</span>
            <textarea name="robotsExtra" rows={3} defaultValue={settings.robotsExtra} className={input} />
          </label>
        </section>

        <button className="rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white hover:bg-royal">
          Save settings
        </button>
      </form>
    </div>
  );
}
