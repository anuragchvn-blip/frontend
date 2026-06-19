import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, role, coolestThing, workLink } = await request.json();

    const roleName = role === "system-engineer" 
      ? "System Engineer (Spacecraft)" 
      : role === "hardware-researcher" 
      ? "Hardware Researcher" 
      : "Other";

    const resendKey = process.env.RESEND_API_KEY;
    
    // 1. Send the clean, warm-minimalist HTML email matching the landing page theme
    if (resendKey) {
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Job Application: ${name}</title>
          </head>
          <body style="margin: 0; padding: 40px 20px; background-color: #f5ecd7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
            
            <!-- Brand Wordmark Header -->
            <div style="text-align: center; margin-bottom: 28px;">
              <span style="font-size: 22px; font-weight: 800; color: #0b0b0f; letter-spacing: -0.03em; font-family: sans-serif;">cryptik</span>
              <div style="font-family: monospace; font-size: 9px; color: rgba(11, 11, 15, 0.4); text-transform: uppercase; letter-spacing: 0.25em; margin-top: 4px;">orbital systems</div>
            </div>

            <!-- Content Card Container (Styled like homepage capability cards) -->
            <div style="background-color: #fdfcfb; border: 1px solid rgba(11, 11, 15, 0.08); border-radius: 16px; max-width: 580px; margin: 0 auto; box-shadow: 0 12px 38px rgba(0, 0, 0, 0.04); overflow: hidden; padding: 36px; box-sizing: border-box;">
              
              <div style="font-family: sans-serif; font-size: 10px; font-weight: bold; color: #2b5be0; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 8px;">
                Careers Portal
              </div>
              <h2 style="font-size: 22px; font-weight: 700; color: #0b0b0f; margin: 0 0 24px 0; letter-spacing: -0.01em; font-family: sans-serif;">
                Application Telemetry
              </h2>

              <!-- Details Grid -->
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(11, 11, 15, 0.06); font-family: monospace; font-size: 10px; color: rgba(11, 11, 15, 0.45); width: 130px; text-transform: uppercase; letter-spacing: 0.05em;">Applicant Name</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(11, 11, 15, 0.06); font-size: 14px; font-weight: 600; color: #0b0b0f; font-family: sans-serif;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(11, 11, 15, 0.06); font-family: monospace; font-size: 10px; color: rgba(11, 11, 15, 0.45); text-transform: uppercase; letter-spacing: 0.05em;">Email Coordinates</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(11, 11, 15, 0.06); font-size: 14px; font-weight: 500; font-family: sans-serif;">
                    <a href="mailto:${email}" style="color: #2b5be0; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(11, 11, 15, 0.06); font-family: monospace; font-size: 10px; color: rgba(11, 11, 15, 0.45); text-transform: uppercase; letter-spacing: 0.05em;">Target Orbit</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid rgba(11, 11, 15, 0.06); font-size: 14px; font-weight: 600; color: #0b0b0f; font-family: sans-serif;">${roleName}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; font-family: monospace; font-size: 10px; color: rgba(11, 11, 15, 0.45); text-transform: uppercase; letter-spacing: 0.05em;">Work links</td>
                  <td style="padding: 12px 0; font-size: 14px; color: #0b0b0f; font-family: sans-serif;">
                    ${workLink ? `<a href="${workLink.startsWith('http') ? workLink : 'https://' + workLink}" target="_blank" style="color: #0b0b0f; font-weight: 500; text-decoration: underline;">${workLink}</a>` : '<span style="color: rgba(11,11,15,0.3);">None provided</span>'}
                  </td>
                </tr>
              </table>

              <!-- Project Brief Card (Matching site's cream background blocks) -->
              <div style="background-color: #f5ecd7; border-radius: 12px; padding: 24px; border: 1px solid rgba(11, 11, 15, 0.04); margin-bottom: 32px; box-sizing: border-box;">
                <div style="font-family: monospace; font-size: 9px; color: rgba(11, 11, 15, 0.4); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px;">
                  PROJECT BRIEF & COOLEST BUILD
                </div>
                <div style="font-size: 14px; line-height: 1.6; color: rgba(11, 11, 15, 0.75); white-space: pre-wrap; font-family: sans-serif;">${coolestThing || 'No log details provided.'}</div>
              </div>

              <!-- Reply Action Button (Matching site's 3D Blue Button) -->
              <div style="text-align: center;">
                <a href="mailto:${email}" style="display: inline-block; background-color: #2b5be0; color: #f5ecd7; font-family: sans-serif; font-size: 13px; font-weight: 600; text-decoration: none; padding: 14px 28px; border-radius: 10px; box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -2px 0 rgba(0, 0, 0, 0.25); border-bottom: 3px solid #1a3fa3; letter-spacing: 0.02em;">
                  Reply to Applicant
                </a>
              </div>

            </div>

            <!-- Footer Details -->
            <div style="text-align: center; margin-top: 32px; font-family: monospace; font-size: 9px; color: rgba(11, 11, 15, 0.35); text-transform: uppercase; letter-spacing: 0.15em;">
              All systems nominal &bull; Lock-In: July 15th
            </div>

          </body>
        </html>
      `;

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${resendKey}`
        },
        body: JSON.stringify({
          from: "Cryptik Careers <onboarding@resend.dev>",
          to: "anurag@cryptik.space",
          subject: `Job Application: ${roleName} - ${name}`,
          html: htmlContent
        })
      });

      const result = await res.json();
      if (res.ok) {
        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json({ success: false, message: result.message || "Failed to send email via Resend" });
      }
    }

    // 2. Fallback to Web3Forms
    const web3Key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (web3Key) {
      const formattedMessage = `
CRYPTIK TELEMETRY REPORT
--------------------------------------------------
APPLICANT:     ${name} (${email})
TARGET ORBIT:  ${roleName}
WORK LINKS:    ${workLink || "None"}

PROJECT BRIEF & COOLEST BUILD:
${coolestThing || "None"}

--------------------------------------------------
All systems nominal. Lock-In: July 15th
`;

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3Key,
          name: name,
          email: email,
          subject: `Job Application: ${roleName} - ${name}`,
          role: roleName,
          message: formattedMessage,
        }),
      });

      const result = await response.json();
      if (result.success) {
        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json({ success: false, message: result.message || "Web3Forms submission failed." });
      }
    }

    return NextResponse.json({ 
      success: false, 
      message: "No email keys configured. Please set RESEND_API_KEY or NEXT_PUBLIC_WEB3FORMS_KEY in your env." 
    }, { status: 400 });

  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message || "Internal server error" }, { status: 500 });
  }
}
