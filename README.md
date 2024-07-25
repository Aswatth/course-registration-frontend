
<h1>Course Registration System</h1>
<p>This repo is frontend application for the course-registration-system implemented using Next.js a React framework.</p>

<h3>How it works</h3>
<hr>

<img src="readme_images/login_page.png">
This would be the very first screen where all users would login using their email-id and password.
Based on their user-type they would be routed to respective homepages.
Unauthorized access to pages would revert back to login page.

<b>User types:</b>
<ul>
  <li>Admin</li>
  <li>Professor</li>
  <li>Student</li>
</ul>

<h3>Admin</h3>
<hr>
<img src="readme_images/admin/admin_home_page.png">
This would be the home page if the logged in user is an admin.

Admin would have the ability to perform CRUD operation on 
<ul>
  <li>Courses</li>
  <li>Professor profiles</li>
  <li>Student profiles</li>
</ul>
with some exceptions like:
<ul>
  <li>Cannot delete courses if they are being offered</li>
  <li>Cannot delete delete professor profile if they are offering a course</li>
  <li>Cannot delete student profile if they are registered for atleast one course</li>
</ul>

<li>Courses:</li>
<img src="readme_images/admin/course/1_admin_course_page.png">
This pages would display list of all courses that are created. Clicking on <i>Add course</i> would navigate to below page.
<img src="readme_images/admin/course/2_add_course.png">
Where admins can create new courses with respective data. All fields are mandatory. Duplicate course_ids are not allowed. Invalid/ empty fields are notified like below:
<img src="readme_images/admin/course/3_add_course_error.png">

Upon successful creation the new course would be displayed on course page
<img src="readme_images/admin/course/4_new_course.png">

Created course can then be edited by clicking on respective <i>Edit</i> button which would navigate to edit page.
<img src="readme_images/admin/course/5_edit_course.png">
All fields except course_id can be updated with valid values
<img src="readme_images/admin/course/6_edited_course.png">

Successful update would go back to course page displaying the updated course
<img src="readme_images/admin/course/7_updated_course.png">

Similar to edit, courses can be deleted by clicking onr respective <i>Delete</i> button which would then ask for confirmation for the same.
<img src="readme_images/admin/course/8_delete_course.png">
Successful deletion would display updated list of courses
<img src="readme_images/admin/course/9_deleted_course.png">

<i><b>Note:</b> Courses that are offered by a professor cannot be deleted.

<hr>

<h1>Running the front-end application</h1>

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
