const doctorHandler = {
    getValidDoctors: async (request, h) => {
        try {
            const { db } = request.server.app;

            const doctorsRef = db.collection('users')
                .where('role', '==', 'doctor')
                .where('isValid', '==', true);

            const snapshot = await doctorsRef.get();

            if (snapshot.empty) {
                return h
                    .response({
                        status: 'success',
                        message: 'No valid doctors found',
                        data: [],
                    })
                    .code(200);
            }

            const doctors = snapshot.docs.map(doc => {
                const doctorData = doc.data();
                const { password, ...doctorWithoutPassword } = doctorData;

                return {
                    id: doc.id,
                    ...doctorWithoutPassword,
                };
            });

            return h
                .response({
                    status: 'success',
                    data: doctors,
                })
                .code(200);
        } catch (error) {
            console.error('Get valid doctors error:', error);
            return h
                .response({
                    status: 'error',
                    message: 'Internal server error',
                })
                .code(500);
        }
    }
};

export default doctorHandler;