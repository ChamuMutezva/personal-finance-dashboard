# Personal Finance Dashboard

- Created using NextJs 14 and features several features which includes some of those listed below.
- used Server actions and server components to fetch data from the database

## Test Data

you can test using the following details
email: `user@nextmail.com`
password: 123456

## Pages

### Landing Page

- The general landing page that can be viewed on `https://personal-finance-dashboard-two.vercel.app/`. The page has a link element to the login form.

### Login Page

- users should login using an email and password to view the dashboard. Upon authentication the user will be directed to the Dashboard page. The link from the Landing page , will take you to the Login page where the url will be `https://personal-finance-dashboard-two.vercel.app/login`. The page has 3 options which you can follow:

1. Fill in with right credentials and press the `Login` button to proceed to the Dashboard page
2. If you have forgotten your credentials , use the `forgot password` option to recover your login details. This function is still under construction - hence it is work in progress.
3. Select the `Signup` button , so that you can submit your details.

### Signup Page

- Sign up with your username , email and password . These will be saved in the database - use them to Login in to the Dashboard

### Forgot Password Page

- Work in progress...

### Dashboard Pages

- The Dashboard has 5 pages and can only be viewed upon a successful authentication.

## Features

### Dark and Light Mode

- with NextJs and Shadcn , adding the Dark mode theme is a walk in the park. This is well explained here [nextjs dark mode](https://ui.shadcn.com/docs/dark-mode/next)

1. First , install next-themes with `pnpm add next-themes`
2. Create a theme provider
3. Wrap your root layout

### Tables

- used Shadcn [Data table component](https://ui.shadcn.com/docs/components/data-table) and utilised [TanStack Table](https://tanstack.com/table/latest/docs/introduction) for the logic, state and processing for UI elements and interactions. TanStack table has features that include sorting and filtering

### Chart

- another important component which comes with Shadcn is the [Charts](https://ui.shadcn.com/charts). The Chart in the Budget page was created using the Pie Chart from Shadcn with a little fix to bring it closer to the design.

## Bugs

### Dashboard not in sync with address bar on successful login

The issue I am facing is as follows:
The project has a dashboard that can be viewed after authentication.  The auth is working fine but probably the bug is somewhere there. When the correct details has been entered , you will be taken to the Dashboard page and  that's ok.  While the site has navigated to the Dashboard page, the address bar will still be pointing to `http://localhost:3000/login`  instead of `http://localhost:3000/dashboard`

If I want to close the site with the close button on this instance, the site will not close - I guess this is because the address is pointing to the destination page - to close it , I need to navigate to other pages first.

Pages to look at for debugging:

1. Login-form.tsx - calls the server function authenticate  - the form uses the server action method.
2. the authenticate function is in the action.ts file - lines 83 - 152
3. when the data is correct the createSession function is called from the session.ts file

```tsx
// helper function for creating a new session
export async function createSession(userId: string) {
    const expires = new Date(Date.now() + 60 * 60 * 1000);
    const session = await encrypt({ userId, expires });

    cookies().set("session", session, {
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: "lax",
        path: "/",
    });
    redirect("/dashboard");
}
```

at this point , i expect the address bar to have the correct path
