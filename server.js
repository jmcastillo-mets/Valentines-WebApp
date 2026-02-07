import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Log file path (root folder)
const logFilePath = path.join(__dirname, 'interaction_log.json');

// Initialize log file if it doesn't exist
if (!fs.existsSync(logFilePath)) {
    fs.writeFileSync(logFilePath, JSON.stringify([], null, 2));
}

// API endpoint to log interactions
app.post('/api/log', async (req, res) => {
    try {
        const { action } = req.body;

        if (!action || (action !== 'yes' && action !== 'no')) {
            return res.status(400).json({ error: 'Invalid action. Must be "yes" or "no".' });
        }

        // Read existing logs
        const existingLogs = JSON.parse(fs.readFileSync(logFilePath, 'utf-8'));

        // Create new log entry (timestamp in Philippine Time, Asia/Manila)
        const now = new Date();
        // Format using ISO-like string in Asia/Manila timezone
        const manila = new Intl.DateTimeFormat('sv-SE', {
            timeZone: 'Asia/Manila',
            hour12: false,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }).format(now); // returns "YYYY-MM-DD HH:MM:SS"

        const timestamp = manila.replace(' ', 'T') + '+08:00';

        const logEntry = {
            timestamp,
            action: action,
            userAgent: req.headers['user-agent'] || 'Unknown',
        };

        // Add to logs
        existingLogs.push(logEntry);

        // Write back to file
        fs.writeFileSync(logFilePath, JSON.stringify(existingLogs, null, 2));

        console.log(`[${logEntry.timestamp}] User clicked: ${action}`);

        // Send notification email if SMTP is configured and NOTIFY_EMAIL is set
        try {
            const smtpHost = process.env.SMTP_HOST;
            const notifyTo = process.env.NOTIFY_EMAIL;

            if (smtpHost && notifyTo) {
                const transporter = nodemailer.createTransport({
                    host: process.env.SMTP_HOST,
                    port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
                    secure: process.env.SMTP_SECURE === 'true', // true for 465
                    auth: process.env.SMTP_USER
                        ? {
                              user: process.env.SMTP_USER,
                              pass: process.env.SMTP_PASS,
                          }
                        : undefined,
                });

                const mailOptions = {
                    from: process.env.SMTP_FROM || (process.env.SMTP_USER || 'no-reply@example.com'),
                    to: notifyTo,
                    subject: `Valentines App - User clicked: ${action}`,
                    text: `Time: ${logEntry.timestamp}\nAction: ${logEntry.action}\nUser Agent: ${logEntry.userAgent}`,
                };

                await transporter.sendMail(mailOptions);
                console.log('Notification email sent to', notifyTo);
            } else {
                // SMTP not configured — skip email
                if (!smtpHost) console.log('SMTP not configured, skipping email notification.');
                if (!notifyTo) console.log('NOTIFY_EMAIL not set, skipping email notification.');
            }
        } catch (emailErr) {
            console.error('Failed to send notification email:', emailErr);
        }

        res.json({ success: true, message: `Logged action: ${action}`, entry: logEntry });
    } catch (error) {
        console.error('Error logging interaction:', error);
        res.status(500).json({ error: 'Failed to log interaction' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Get all logs (optional - for viewing logs)
app.get('/api/logs', (req, res) => {
    try {
        const logs = JSON.parse(fs.readFileSync(logFilePath, 'utf-8'));
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve logs' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Logs will be saved to: ${logFilePath}`);
});
