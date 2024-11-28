import cron from 'node-cron';
import { enviarRecordatorios } from './mail';


export const scheduleJobs = () => {
  
  cron.schedule('*/2 * * * *', async () => {
    
    await enviarRecordatorios();
  });
  
};
