import type { ReactNode } from "react";

interface SettingsSectionProps {
  title: string;
  description: string;
  children: ReactNode;
}

function SettingsSection({ title, description, children }: SettingsSectionProps) {
  return (
    <section className="settings-section">
      <div className="settings-section__header">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="settings-section__content">{children}</div>
    </section>
  );
}

export default SettingsSection;
