export const CATEGORIES = [
  {
    name: "Art & Humanities",
    id: 10,
  },
  {
    name: "Business",
    id: 2,
  },
  {
    name: "Engineering",
    id: 8,
  },
  {
    name: "Health & Nutrition",
    id: 5,
  },
  {
    name: "Languages",
    id: 11,
  },
  {
    name: "Law",
    id: 9,
  },
  {
    name: "Social Sciences",
    id: 12,
  },
  {
    name: "Technology",
    id: 1,
  },
];

export const PACES = [
  {
    name: "Self paced",
    id: 10,
    link: "/courses?method=pace&pace=self&filter=course",
  },
  {
    name: "Instructor led",
    id: 2,
    link: "/courses?method=pace&pace=instructor&filter=course",
  },
];

export const FEES = [
  {
    name: "Free",
    id: 10,
    link: "/courses?method=fee&amount=free&filter=course",
  },
  {
    name: "Paid",
    id: 2,
    link: "/courses?method=fee&amount=paid&filter=course",
  },
];

export const AUTHLINKS = [
  {
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    name: "Profile",
    link: "/learner/profile",
  },
  {
    name: "My Learning",
    link: "/mycourses",
  },
  {
    name: "Notifications",
    link: "/notifications",
  },
  {
    name: "Billing",
    link: "/billing",
  },
];

export const ADMINLINKS = [
  {
    name: "Dashboard",
    link: "/admin/dashboard",
  },
  {
    name: "Learners",
    link: "/admin/learners",
  },
  {
    name: "Courses",
    link: "/admin/courses",
  },
  
  
  {
    name: "Instructors",
    link: "/admin/instructors",
  },
  {
    name: "Business",
    link: "/admin/business",
  },
  {
    name: "Categories",
    link: "/admin/categories",
  },
  
  {
    name: "Certificates",
    link: "/admin/certificates",
  },

  {
    name: "Subscriptions",
    link: "/admin/subscriptions",
  },

  {
    name: "Bundle programs",
    link: "/admin/programs",
  },
];
