from fpdf import FPDF

class PDF(FPDF):
    def header(self):
        pass

    def footer(self):
        pass

def create_cv():
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    
    # Title
    pdf.set_font("Helvetica", "B", 18)
    pdf.cell(0, 8, "Chethan Rai", ln=True, align="C")
    
    # Contact Info
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(0, 102, 204)
    pdf.cell(0, 6, "chethanrai6@gmail.com  |  8848389933  |  LinkedIn: chethan rai", ln=True, align="C")
    pdf.set_text_color(0, 0, 0)
    pdf.ln(4)
    
    def add_section_header(title):
        pdf.set_font("Helvetica", "B", 11)
        pdf.cell(0, 6, title.upper(), ln=True)
        pdf.set_draw_color(50, 50, 50)
        pdf.set_line_width(0.4)
        pdf.line(pdf.get_x(), pdf.get_y(), pdf.get_x() + 180, pdf.get_y())
        pdf.ln(3)

    # Objective
    add_section_header("Objective")
    pdf.set_font("Helvetica", "", 9.5)
    pdf.multi_cell(0, 5, "To work in an environment that will help me to enhance my skills and also help me to achieve personal as well as organizational goals.")
    pdf.ln(3)

    # Education
    add_section_header("Education")
    pdf.set_font("Helvetica", "B", 9.5)
    pdf.cell(120, 5, "St Aloysius (Deemed to be University), Institution of Management and IT", ln=False)
    pdf.set_font("Helvetica", "", 9.5)
    pdf.cell(0, 5, "Mangalore, India", ln=True, align="R")
    pdf.set_font("Helvetica", "", 9.5)
    pdf.cell(120, 5, "MCA , SGPA-8.35", ln=False)
    pdf.cell(0, 5, "April 2026", ln=True, align="R")
    pdf.ln(2)

    pdf.set_font("Helvetica", "B", 9.5)
    pdf.cell(120, 5, "St Aloysius College (Autonomous)", ln=False)
    pdf.set_font("Helvetica", "", 9.5)
    pdf.cell(0, 5, "Mangalore, India", ln=True, align="R")
    pdf.set_font("Helvetica", "", 9.5)
    pdf.cell(120, 5, "BCA, CGPA- 7.71", ln=False)
    pdf.cell(0, 5, "July 2024", ln=True, align="R")
    pdf.ln(3)

    # Internship Experience
    add_section_header("Internship Experience")
    pdf.set_font("Helvetica", "B", 9.5)
    pdf.cell(0, 5, "Tatvam Consulting-Software Development Intern [JAN-2026-April2026]", ln=True)
    pdf.set_font("Helvetica", "", 9)
    pdf.multi_cell(0, 4.5, " - Contributed to the complete development of the METAIA platform, including 2 mobile applications and 1 web application.\n - Designed and developed the complete UI/UX and frontend for the METAIA applications using Flutter.\n - Implemented backend functionalities and integrated APIs to support authentication, application workflows, and core system features.")
    pdf.ln(3)

    # Projects
    add_section_header("Projects")
    pdf.set_font("Helvetica", "B", 9.5)
    pdf.cell(0, 5, "TheCourtyard -- Full-Stack Booking & Management Platform", ln=True)
    pdf.set_font("Helvetica", "", 9)
    pdf.multi_cell(0, 4.5, " > thecourtyard is a full-stack pickleball court booking and subscription management platform that allows users to reserve courts, purchase monthly memberships.\n > Built and deployed full-stack web application using React, TypeScript, Vite, Node.js, Firebase.")
    pdf.ln(2)

    pdf.set_font("Helvetica", "B", 9.5)
    pdf.cell(0, 5, "GridCraft -- Drawing Grid Generator Web Application (MERN)", ln=True)
    pdf.set_font("Helvetica", "", 9)
    pdf.multi_cell(0, 4.5, " > Developed a responsive web application for generating customizable drawing grids for artists and designers.\n > Built interactive frontend features for image upload, grid customization, and real-time preview generation.")
    pdf.ln(3)

    # Technical Skills
    add_section_header("Technical Skills")
    pdf.set_font("Helvetica", "", 9)
    skills = [
        ("Languages:", "Python, Java, C, C++"),
        ("Database:", "MySQL, MongoDB, Firebase"),
        ("Frontend:", "HTML, CSS, JavaScript, React JS"),
        ("Backend:", "Node JS, Express JS"),
        ("Soft Skills:", "Problem Solving, Time Management, Quick Learner")
    ]
    for label, val in skills:
        pdf.set_font("Helvetica", "B", 9)
        pdf.cell(28, 4.5, label, ln=False)
        pdf.set_font("Helvetica", "", 9)
        pdf.cell(0, 4.5, val, ln=True)
    pdf.ln(3)

    # Certifications
    add_section_header("Certifications")
    pdf.set_font("Helvetica", "", 9)
    pdf.multi_cell(0, 4.5, " > Privacy and Security in Online Social Media - NPTEL\n > Introduction to Cyber Security - NPTEL")
    pdf.ln(3)

    # Hobbies and Interests
    add_section_header("Hobbies and Interests")
    pdf.set_font("Helvetica", "", 9)
    pdf.cell(0, 4.5, "going to gym, listening to music, and Cooking.", ln=True)

    pdf.output("d:/MYPORTFOLIO/assets/Chethan_Rai_CV.pdf")
    print("PDF generated successfully at d:/MYPORTFOLIO/assets/Chethan_Rai_CV.pdf")

if __name__ == "__main__":
    create_cv()
