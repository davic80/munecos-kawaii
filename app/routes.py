import os
from flask import Blueprint, render_template

bp = Blueprint('main', __name__)

@bp.route('/')
def index():
    return render_template('index.html', app_version=os.environ.get('APP_VERSION', 'dev'))
