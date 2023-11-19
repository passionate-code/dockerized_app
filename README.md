### General overview ###

The mini AI-based chatbot system was developed using Django for its back-end process. PostgreSQL is the relational database that has been used to make the table for mini product recommender dataset. The front-end was developed using HTML, CSS, Javascript, jQuery and Bootstrap+AdminLTE templates. I have decided to use transfer learning instead of generating the model using the dataset from scratch. The model that I have fine-tuned is BERT (Bidirectional Encoder Representations from Transformers) using the huggingface library. The mini product recommender dataset has been cleaned to handle missing values and tokenised. The fine-tuned model has been trained using the product descriptions from pre-processed  mini product recommender dataset. It is able to classify user query by returning the name of top three products that have the highest score (i.e. its product description similar to the user query). In the interface, there will be a form for users to submit their query. The form submission will be handled by jQuery ajax. Django will handle the ajax request and returned json response that contains prediction from the fine-tuned model. The response to user query will be displayed in the chatbot interface. The mini AI-based chatbot system could be accessed via this url:
http://rinalab.org/django/chatmind/

# Dependencies #

install python version 3.8-3.11
pip3 install --upgrade pip
pip3 install numpy
pip3 install pandas
pip3 install torch
pip3 install nltk
nltk.download('stopwords',download_dir='/home/path/nltk_data')
pip3 install setuptools-rust
pip3 install transformers
pip3 install scikit-learn

### Data Preparation ###

1. Run django/chatmind/product_data_processing.py. Specifically cleaned_dataset function. Input is mini_product_recommender_dataset.csv
python3.8 manage.py shell < chatmind/product_data_processing.py
2. Make sure you give the right permission for the run, specifically for nltk download_dir
3. Output is mini_product_recommender_dataset_clean.csv and pandas dataframe (df_product)

### Model Training ###

1. Run product_data_processing.py. Everything except cleaned_dataset function. Input is pandas dataframe (df_product)
python3.8 manage.py shell < chatmind/product_data_processing.py
2. Make sure you give the right permission for the run, specifically for /path/to/.cache/huggingface, path/to/results, path/to/logs, path/to/saved/model
3. Output is fine-tuned BERT model

# Dependencies #

# install django dependencies in Cent OS
sudo yum install epel-release
rpm --import /etc/pki/rpm-gpg/RPM-GPG-KEY-EPEL-7
yum -y -q install httpd mod_ssl httpd-devel
yum -y -q groupinstall development
yum -y -q install zlib2-devel openssl-devel sqlite-devel bzip2-devel python-devel openssl-devel openssl-perl libjpeg-turbo libjpeg-turbo-devel zlib-devel giflib ncurses-devel gdbm-devel xz-devel tkinter readline-devel tk tk-devel kernel-headers glibc libpng gcc-c++
yum install python38-devel
rpm -q --filesbypkg python3-devel-3.8.8-18.el7.x86_64
rm -rf /usr/bin/python
ln -s /usr/bin/python3.8m /usr/bin/python
# install django mod_wgsi
tar xvfz mod_wsgi-4.9.4.tar.gz
./configure LDFLAGS='-Wl,-rpath=/usr/lib64' --with-python=/usr/bin/python3.8m
make
make install
# install relational database PSQL for Django
sudo yum install postgresql-server postgresql-devel postgresql-contrib
sudo postgresql-setup initdb
sudo systemctl start postgresql
sudo vim /var/lib/pgsql/data/pg_hba.conf
host    all             all             127.0.0.1/32            md5
host    all             all             ::1/128                 md5
sudo systemctl restart postgresql
sudo systemctl enable postgresql

# Edit apache configuration files #

# add to /etc/httpd/conf/httpd.conf
LoadModule wsgi_module modules/mod_wsgi.so
# add to /etc/httpd/conf.d/django.conf
Alias /static /var/www/html/django/static
<Directory /var/www/html/django/static>
    Require all granted
</Directory>
<Directory /var/www/html/django/media>
    Require all granted
</Directory>
<Directory /var/www/html/django/mysite>
    <Files wsgi.py>
        Require all granted
    </Files>
</Directory>
WSGIDaemonProcess django python-path=/var/www/html/django:/usr/bin/python3.6m
WSGIApplicationGroup %{GLOBAL}
WSGIProcessGroup django
WSGIScriptAlias /django /var/www/html/django/mysite/wsgi.py

### Backend Development ###

1. The backend of chatbot system was developed using Django.
2. Create project mysite
python3.8 -m django startproject mysite
3. Edit settings.py. Add the following:
ALLOWED_HOSTS = ['localhost','127.0.0.1','your server ip']
INSTALLED_APPS = [
    "chatmind.apps.ChatmindConfig",
]
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'chatmindDB',
        'USER': 'yourusername',
        'PASSWORD': 'yourpassword',
        'HOST': 'localhost',
        'PORT': '',
    }
}
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, "static/")
4. Copy django/mysite/urls.py into your mysite directory
5. Run django on cli
python3.8 manage.py runserver 0.0.0.0:8000
6. Check in browser to test django installation
localhost:8000
7. Create project application named chatmind
python3.8 manage.py startapp chatmind
8. Copy django/chatmind/models.py into your chatmind directory. Store changes from model.py
python3.8 manage.py makemigrations chatmind
9. Made product table in PSQL database
python3.8 manage.py migrate
10. Copy django/chatmind/results into your chatmind directory that contains ML checkpoints
11. Copy django/chatmind/views.py into your chatmind directory
12. Copy django/chatmind/logs into your chatmind directory
13. Copy django/chatmind/model_ML into your chatmind directory that contains fine-tuned ML model
14. Copy django/chatmind/data_api.py into your chatmind directory. Run this script to push data from mini_product_recommender_dataset.csv into Product table in PSQL
python3.8 manage.py shell < chatmind/data_api.py
15. Make sure you give appropriate permission to all copied files and directories

### Front-end Development ###

1. Copy django/chatmind/templates into your chatmind directory
2. Copy django/static into your django directory

### Demo ###

1. Go to url: http://rinalab.org/django/chatmind/
2. Enter a query inside the text box and hit submit to fetch real time chatbot response
3. User query and chatbot response will be displayed inside the right panel
4. The left panels will show details pulled from the database for top three products that matched user query
5. Refer Figure 1 for example demo





