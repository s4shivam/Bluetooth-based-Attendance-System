import eel
import bluetooth
import mysql.connector
import xlrd
import xlwt
import os.path
import datetime
from xlutils.copy import copy
from xlwt import Workbook
import hashlib
eel.init('web')

#database connector
mydb = mysql.connector.connect(
    host = "localhost",
    user = "root",
    passwd = "root",
    database = "newdd"
)
mycursor = mydb.cursor()
def reset():
    print("Data reset")
    mycursor = mydb.cursor()
    mysql_query = "UPDATE "+table_name+" SET Status = 'Absent'"
    mycursor.execute(mysql_query)
    mydb.commit();

mycursor.execute("SELECT * FROM attend")
myresult = mycursor.fetchall()
print(myresult)
mycursor.execute("SELECT COUNT(*) FROM attend")
myrows = (mycursor.fetchone())[0]
print(myrows)

def PasswordEncrypt(password):
    ciphered_text = hashlib.md5(password.encode())
    return ciphered_text.hexdigest()


# User LOGIN LOGIC
CurrenUserName = None
CurrentUserId = None
@eel.expose
def UserLogin(Id,Pass):
    print("ID is : ",Id)
    print("passwd is : ",Pass)
    cipherPass = PasswordEncrypt(Pass)
    print(cipherPass)
    sql = "SELECT * FROM faculty WHERE faculty_id = %s"
    adr = (Id,)
    mycursor.execute(sql, adr)
    ListOfIds = mycursor.fetchall()
    print(ListOfIds)
    if( ListOfIds ):
        if(cipherPass == ListOfIds[0][2]):
            print("Login Success")
            global CurrentUserName
            global CurrentUserId
            CurrentUserName = ListOfIds[0][1]
            CurrentUserId = ListOfIds[0][0]
            print(Id)
            return Id
        else :
            return "Password Mismatch"
    else :
        return "No ID found"

#CreateTable
@eel.expose
def CreateTable():
    print(CurrentUserId)
    table_name = CurrentUserId.replace('-','_')
    print(table_name)
    print(CurrentUserId)
    sql1 = "CREATE TABLE "+table_name+" (rollno VARCHAR(20) PRIMARY KEY,Name VARCHAR(30),Status VARCHAR(10) DEFAULT 'Absent',Status_IN VARCHAR(10) DEFAULT 'Absent',Status_OUT VARCHAR(10) DEFAULT 'Absent')"
    mycursor.execute(sql1)

@eel.expose
def DropTable():
    print(CurrentUserId)
    table_name = CurrentUserId.replace('-','_')
    print(table_name)
    sql2 = "DROP TABLE "+table_name+";"
    mycursor.execute(sql2)
    return table_name;



@eel.expose
def GetuserInfo():
    mysql_query = "SELECT Subject_code FROM teaches WHERE faculty_id = %s"
    value = (CurrentUserId,)
    print( "VALUE IS :",value)
    mycursor.execute(mysql_query,value)
    result = mycursor.fetchall()
    print(result)
    return CurrentUserId,CurrentUserName,result

#NEW USER SIGN UP
@eel.expose
def UserSignupFunction(arg1,arg2,arg3,arg4):
    print("User ID is : ",arg1)
    print("Name is : ",arg2)
    print("passwd is : ",arg3)
    print('Subjects are:',arg4)
    encryptpass = PasswordEncrypt(arg3)
    print("Encypted passwd is : ",encryptpass)
    sql1 = "INSERT INTO faculty (faculty_id, Faculty_name,password) VALUES (%s, %s , %s)"
    val1 = (arg1,arg2,encryptpass)
    mycursor.execute(sql1, val1)
    for i in range(len(arg4)):
        sql2 = "INSERT INTO teaches(faculty_id,Subject_code) VALUES(%s,%s)"
        val2 = (arg1,arg4[i])
        mycursor.execute(sql2,val2)
    return True


#TAKING ATTENDANCE OF STUDENTS
@eel.expose
def TakingAttendance(arg):
    table_name = CurrentUserId.replace('-','_')
    sql0 = "DELETE from "+table_name+";"
    mycursor.execute(sql0);
    sql1 = "SELECT rollno,Name,BT_Address from student_info natural join enrolled where Subject_code = %s";
    value = (arg,)
    print( "VALUE IS :",arg)
    mycursor.execute(sql1,value)
    res0 = mycursor.fetchall()
    sql2 = "SELECT COUNT(*) from student_info natural join enrolled where Subject_code = %s";
    mycursor.execute(sql2,value)
    rows = (mycursor.fetchone())[0]
    print(rows)
    print(res0)
    for x in range(rows):
        sql3 = "INSERT INTO "+table_name+" (rollno, Name,Status) VALUES (%s, %s , 'Absent')"
        values = (res0[x][0],res0[x][1])
        mycursor.execute(sql3,values)
    address = []
    nearby_devices = bluetooth.discover_devices(lookup_names=True)
    print("found %d devices" % len(nearby_devices))
    for addr, name in nearby_devices:
        print("add : "+addr+" aName : "+name)
    for addr,name in nearby_devices:
        address.append(addr)
    for x in address:
        print(x)
    #for x in range(rows) :
        #global myresult
        #res.append(myresult[x][3])
       # res.append(res0[x][2])
    
    print("INSIDE RES =========================")
    for x in range(rows):
        print(res0[x][2])
    print("=========================")
    for x in range(rows):
        for y in address:
            if(res0[x][2].lower() == y.lower()):
                print("Student is present:" + y)
                mysql_query = "UPDATE "+table_name+" SET Status = 'Present' WHERE rollno = %s"
                mycursor.execute(mysql_query,(res0[x][0],))
                mydb.commit()

    #No of Students Present
    mysql_query = "SELECT COUNT(*) FROM "+table_name+" WHERE status ='PRESENT'"
    mycursor.execute(mysql_query)
    res1 = mycursor.fetchone()
    return res1[0]
    
#STUDENT CURRENTLY DETECTED BY bluetooth
@eel.expose
def ShowCurrentlyPresent():
    table_name = CurrentUserId.replace('-','_')
    mycursor = mydb.cursor()
    mysql_query = "SELECT Name FROM "+table_name+" WHERE status ='Present'"
    mycursor.execute(mysql_query)
    res = mycursor.fetchall()
    return res


#WRITE ATTENDANCE IN EXCEL SHEET
@eel.expose
def WritingInExcel(arg):
    table_name = CurrentUserId.replace('-','_')
    print("ARGUMENT RECIEVED IS :",type(arg))
    print("INSIDE EXCEL FUNCTION")
    x= datetime.datetime.now()
    if(os.path.exists(arg +'.xls')):
        loc = (arg +".xls")
        # To open Workbook
        wb1 = xlrd.open_workbook(loc)
        sheet1 = wb1.sheet_by_index(0)
        rb = xlrd.open_workbook(arg +'.xls')
        wb = copy(rb)
        w_sheet = wb.get_sheet(0)
        if( sheet1.cell_value(0,sheet1.ncols-1) != x.strftime("%x %X")):
            w_sheet.write(0,sheet1.ncols, x.strftime('%x %X'))
            wb.save(arg +'.xls')
    else:
        wb = Workbook()
        # add_sheet is used to create sheet.
        sheet1 = wb.add_sheet('Sheet 1')
        style = xlwt.easyxf('font: bold 1')
        sheet1.write(0, 0, 'Roll No.',style)
        sheet1.write(0, 1, 'Name',style)
        sheet1.write(0,2, x.strftime('%x %X'))
        wb.save(arg +'.xls')
    def showCandR():
        #table_name = CurrentUserId.replace('-','_')
        loc = (arg +".xls")
        wb = xlrd.open_workbook(loc)
        sheet = wb.sheet_by_index(0)
        sheet.cell_value(0, 0)
        # Extracting number of rows
        print("No. of Rows are :",sheet.nrows)
        # Extracting number of columns
        print("No. of Columns are :",sheet.ncols)
    def showData():
        #table_name = CurrentUserId.replace('-','_')
        loc = (arg +".xls")
        wb = xlrd.open_workbook(loc)
        sheet = wb.sheet_by_index(0)
        sheet.cell_value(0, 0)
        print(sheet.row_values(1))

    def writeInfo():
        table_name = CurrentUserId.replace('-','_')
        rb = xlrd.open_workbook(arg +'.xls')
        wb = copy(rb)
        w_sheet = wb.get_sheet(0)
        loc = (arg +".xls")
        wb1 = xlrd.open_workbook(loc)
        sheet = wb1.sheet_by_index(0)
        sheet.cell_value(0, 0)
        mycursor.execute("SELECT * FROM "+table_name+";")
        myresults = mycursor.fetchall()
        print(myresults[0][1]);
        sql = "SELECT COUNT(*) from "+table_name+";"
        mycursor.execute(sql)
        rows = (mycursor.fetchone())[0]
        for i in range(rows):
            w_sheet.write(i+1,0,myresults[i][0])
            w_sheet.write(i+1,1,myresults[i][1])
            w_sheet.write(i+1,sheet.ncols -1,myresults[i][2])
        wb.save(arg +'.xls')
    writeInfo()
    showCandR()
    showData()
    print("DONE")

eel.start('login.html',size=(1920,1080))
