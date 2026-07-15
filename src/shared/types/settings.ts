export type AdminThemePreference = "system" | "light" | "dark";
export type DateFormatPreference = "MM/DD/YYYY" | "DD/MM/YYYY" | "YYYY-MM-DD";

export interface OrganizationSettings {
  organizationName: string;
  supportEmail: string;
  supportPhone: string;
  timezone: string;
  dateFormat: DateFormatPreference;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  urgentAlerts: boolean;
  scheduleReminders: boolean;
  estimateUpdates: boolean;
  expenseAlerts: boolean;
}

export interface DisplaySettings {
  theme: AdminThemePreference;
  compactTables: boolean;
  showBusinessLabels: boolean;
}

export interface SystemSettings {
  autoArchiveDays: number;
  requireExpenseReceipts: boolean;
  highValueExpenseThreshold: number;
}

export interface AdminSettings {
  organization: OrganizationSettings;
  notifications: NotificationSettings;
  display: DisplaySettings;
  system: SystemSettings;
}
