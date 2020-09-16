# Bluetooth-based-Attendance-System
### Summary :

 A Desktop application that provides the facility to mark attendance of students by using bluetooth.The application is also capable of generating Class/Student report for a specific interval.

## Description:

 Built as a part of Academics this Desktop application uses **Eel** which is a Python library for making simple Electron-like offline HTML/JS GUI apps, with full access to Python capabilities and libraries.Eel hosts a local webserver, then lets you annotate functions in Python so that they can be called from Javascript, and vice versa. The application also uses **PyBluez** module that allows Python code to access the host machine's Bluetooth resources.The application uses MySQL for data storage.
 The application scans the bluetooth devices nearby using pybluez to mark the attendance of the respective students. The faculties are provides with authentication facility to view a student report/class report for a particular Interval using **xlrd** , **xlwt** & **xlutils**. And since the faculties are also required to submit class attendance report to the HOD/University record for every respective month the application also generates an Excel Sheet of the class report to make their task easier.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them

```
Eel
Pybluez
MySQL Connector
xlrd
xlwt
xlutils
hashlibs
datetime
```

### Installing

```
pip install del
pip install pybluez
pip install mysql-connector-python
pip install xlrd
pip install xlwt
pip install xlutils
pip install hashlibs
pip install dateTime
```

### Running the application
```
python http://index.py
```

### Built with

* [Eel](https://pypi.org/project/Eel/) - Python library for making simple Electron-like offline HTML/JS GUI apps
* [PyBluez](https://pypi.org/project/PyBluez/) - Allow developers to use system Bluetooth resources
* [xlrd](https://pypi.org/project/xlrd/),[xlwt](https://pypi.org/project/xlwt/) & [xlutils](https://pypi.org/project/xlutils/) - Python Resources for working with Excel
* [MySQL Connector](https://dev.mysql.com/doc/connector-python/en/) - Allows programming languages that support the ODBC interface to communicate with a MySQL database
* [hashlibs](https://pypi.org/project/hashlib/) - Secure hash and message digest algorithm library
* [datetime](https://pypi.org/project/hashlib/) - provides a DateTime data type

### Authors

* **Shivam Agrawal** - - [s4shivam](https://github.com/s4shivam)
* **Amandeep** - - [AmanDeep9925](https://github.com/AmanDeep9925)
* **Parminder Singh** - - [parm05091997](https://github.com/parm05091997)
