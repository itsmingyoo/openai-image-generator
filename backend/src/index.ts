//! Separation of Concerns: Keeping the server initialization (index.ts) separate from the application logic (app.ts) makes your code cleaner and more modular.

import { Request, Response } from 'express';
import app from './app';

const PORT = process.env.PORT || 3000;

// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello World!');
// });


// app.get('/test', (req: Request, res: Response) => {
//   res.send('Test route is working!');
// });


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
