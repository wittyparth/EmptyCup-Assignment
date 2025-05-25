from flask import Flask, jsonify
from flask_cors import CORS 

app = Flask(__name__)
CORS(app) 

DESIGNERS_DATA = [
    {
        "id": 1,
        "name": "Epic Designs",
        "rating": 3.5,
        "description": "Passionate team of 4 designers working out of Bangalore with an experience of 4 years.",
        "projects": 57,
        "years": 8,
        "price": "$$",
        "phone1": "+91-984532853",
        "phone2": "+91-984532854",
        "details": "A leading design studio known for innovative and sustainable interior solutions. Specializing in residential and commercial projects, they bring a unique blend of aesthetics and functionality to every space. Their portfolio includes award-winning designs across various styles, from minimalist to opulent. Committed to client satisfaction, they ensure a seamless design process from concept to completion."
    },
    {
        "id": 2,
        "name": "Studio - D3",
        "rating": 4.0,
        "description": "A dynamic team of 3 designers based in Mumbai, with a focus on modern and minimalist aesthetics.",
        "projects": 43,
        "years": 6,
        "price": "$$$",
        "phone1": "+91-984532853",
        "phone2": "+91-984532854",
        "details": "Studio D3 excels in creating sophisticated and functional living spaces. Their approach emphasizes clean lines, natural materials, and smart technology integration. They have a strong track record in high-end residential projects and boutique commercial spaces, delivering bespoke designs that reflect the client's personality and lifestyle. Collaboration and attention to detail are at the core of their philosophy."
    },
    {
        "id": 3,
        "name": "Ballury Interiors",
        "rating": 4.5,
        "description": "Experienced designers from Chennai, specializing in traditional and contemporary Indian designs.",
        "projects": 65,
        "years": 10,
        "price": "$$",
        "phone1": "+91-984532855",
        "phone2": "+91-984532856",
        "details": "Ballury Interiors is renowned for blending traditional Indian artistry with contemporary design trends. Their expertise lies in creating warm, inviting, and culturally rich environments. They work with local artisans to incorporate unique handcrafted elements, ensuring each project is distinct and timeless. Their services range from complete home renovations to custom furniture design, all delivered with a personal touch."
    },
    {
        "id": 4,
        "name": "Diall Decor",
        "rating": 5.0,
        "description": "Innovative design firm in Delhi, known for their bold concepts and luxurious finishes.",
        "projects": 30,
        "years": 5,
        "price": "$$$$",
        "phone1": "+91-984532857",
        "phone2": "+91-984532858",
        "details": "Diall Decor pushes the boundaries of conventional design, creating spaces that are both visually stunning and highly functional. They are experts in luxury interiors, utilizing premium materials, bespoke furniture, and advanced lighting solutions. Their portfolio includes high-profile commercial projects and exclusive residential properties, reflecting a commitment to unparalleled quality and sophisticated design."
    }
]

@app.route('/api/designers', methods=['GET'])
def get_designers():
    return jsonify(DESIGNERS_DATA)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
