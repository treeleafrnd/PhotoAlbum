from io import BytesIO
from django.http import HttpResponse
from django.template.loader import get_template, render_to_string
from xhtml2pdf import pisa
import tempfile, datetime
# from weasyprint import HTML
import os
import io
import zipfile
from django.http import HttpResponse
from datetime import datetime

def html2pdf(template_source, context_dict = {}):
    template= get_template(template_source)
    html = template.render(context_dict)
    result = BytesIO()
    pdf = pisa.pisaDocument(BytesIO(html.encode("cp1252")),result)

    if not pdf.err:
        return HttpResponse(result.getvalue(), content_type = "application/pdf")
    return None

# def export_pdf(context, template):
#     response = HttpResponse(content_type="application/pdf")
#     response["Content-Disposition"] = (
#         "inline; attachment; filename=identeq-face-"
#         + context["file_name"]
#         + str(datetime.datetime.now())
#         + ".pdf"
#     )
#     response["Content-Transfer-Encoding"] = "binary"
#     html_string = render_to_string(template, context=context)
#     html = HTML(string=html_string, base_url=request.build_absolute_uri())
#     result = html.write_pdf()


#     with tempfile.NamedTemporaryFile(delete=True) as output:
#         output.write(result)
#         output.flush()
#         output = open(output.name, "rb")
#         response.write(output.read())
#     return response

