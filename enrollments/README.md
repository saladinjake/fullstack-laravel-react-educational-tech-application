##Senior Full stack react app/Senior Frontend/Backend ## --REACT-WITH-ME (E-LEARNING-ENROLLMENT-APPLICATION)


## Application Features for version 1.0

The following are the documented tested project features :
### User Module

##### Authentication and email verification system
-  User can sign up
-  Verify Account
-  Login
-  Reset Password
-  Edit Profile

##### COURSE ENROLLMENT
- User can enroll for a course
- Free courses are available for direct enrollment
- Paid courses are added to cart and payment trasaction can be initiated by the user

##### Payments Gate way
- Paystack is used for the payment transaction
- Real Money will be debited from your account if details regarding your bank are entered
- One time otp transaction between payment gateway (Paystack) and recurring user (YOU) to ensure you  are the one making actual payment

##### LMS
- This application is segregated into 4 parts working as a microservice app
- the first part is the enrolment app which concerns display of courses and detail information about the course
- It also contains information regarding user management, shopping cart , checkout features and information about questence
- The second part of the front end is the lms which handles users attending the course and keeps track of course analytics as to what percentage of the course has been completed as well as course navigation from each lesson modules

##### Authoring Tool
- the third part is the authoring module that allows instructors create and manage course contents
- A course comprises of sections , subsections, lessons and units (Components) in a nested  order
- A section can have N - nested subsections which inturn has N nested Lessons and N nested unit (Components)
- Unit is the building block of any lesson defined by its subsection owned by a section
- Unit (Components) can be of different type
   - Plain text content            =>  self explanatory
   - Html Text Content             =>  self explanatory
   - Iframe Content                =>  self explanatory
   - Video (youtube , vimeo, mp4)  =>  self explanatory
   - Discussion component          =>  self explanatory
   - Problem Component           
   - Quiz (Question component)
- Problem component are of various types and form the building block for which quiz or test are derived
They can be numeric in result,general,checkboxes, multiselected(multiple choice),dropdown each with their respective hint types which follow a markdown dynamically generated question and answer 

##### Admin
- Manages the three ends of the application

