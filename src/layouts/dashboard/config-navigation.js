import { useMemo } from 'react';
import { paths } from 'src/routes/paths';
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const data = useMemo(
    () => [
      {
        subheader: 'overview',
        items: [
          { title: 'Dashboard', path: paths.dashboard.root, icon: ICONS.dashboard },
          { title: 'Upload Result', path: paths.dashboard.two, icon: ICONS.file },
          {
            title: 'Data & Forecast',
            path: paths.dashboard.three,
            icon: ICONS.analytics,
          },
        ],
      },
      {
        subheader: 'Support',
        items: [
          {
            title: 'Security',
            path: paths.dashboard.group.root,
            icon: ICONS.lock,
            children: [
              { title: 'role', path: paths.dashboard.group.root },
              { title: 'how to use', path: paths.dashboard.group.five },
            ],
          },
          { title: 'FAQs', path: paths.dashboard.faqs, icon: ICONS.booking},
          { title: 'Contact Us', path: paths.dashboard.contact, icon: ICONS.mail},
        ],
      },
    ],
    []
  );

  return data;
}
