import HomeContentComponent from "../public/pages/home-content.component.vue";
import {createRouter, createWebHistory} from "vue-router";
import SignUpComponent from "../iam/pages/sign-up.component.vue";
import SignInComponent from "../iam/pages/sign-in.component.vue";
import {authenticationGuard} from "../iam/services/authentication.guard.js";
import BookingComponent from "../appointment/pages/booking.component.vue";
import PsychologistAppointmentComponent from "../appointment/pages/psychologist-appointment.component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [

        {path: '/:pathMatch(.*)*', redirect: '/home'},
        {path: '/', name: 'home', component: HomeContentComponent, meta: { title: 'home'}},
        {path: '/home', name: 'home', component: HomeContentComponent, meta: { title: 'home'}},

        { path: '/home/sign-in',                 name: 'sign-in',    component: SignInComponent,             meta: { title: 'Sign In'}},
        { path: '/home/sign-up',                 name: 'sign-up',    component: SignUpComponent,             meta: { title: 'Sign Up'}},

        {path: '/booking', name: 'booking', component: BookingComponent, meta: { title: 'Booking'}},
        {path: '/psychologist', name: 'psychologist', component: PsychologistAppointmentComponent, meta: { title: 'Psychologist'}},

    ]
});


router.beforeEach((to, from, next) => {
    // Set the page title
    let baseTitle = 'Elixir Control';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    // Call the authentication guard
    authenticationGuard(to, from, next);
})

export default router;