import doctorHandler from "../handlers/doctor-handler.js";

const doctorRoutes = {
    name: 'doctor-routes',
    version: '1.0.0',
    register: async (server, _options) => {
        server.route([
            {
                method: 'GET',
                path: '/api/doctors/valid',
                handler: doctorHandler.getValidDoctors,
                options: {
                    auth: false,
                    description: 'Get all valid doctors',
                    tags: ['api', 'doctors'],
                },
            },
        ]);
    },
};

export default doctorRoutes;