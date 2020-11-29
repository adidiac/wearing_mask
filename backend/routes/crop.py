import sys
import os
from PIL import Image
def crop(left,top,right,bottom,name):
    fisiere = os.listdir(os.getcwd()+"/routes/faces")
    size=len(fisiere)
    size=size+1
    original = Image.open(os.getcwd() +"/routes/pictures/"+name)         
    width, height = original.size   # Get dimensions
    # left = 0
    # top = height/2
    # right = width
    # bottom = height        
    cropped = original.crop((int(left), int(top), int(right), int(bottom)))
    cropped.convert('RGB').save(os.getcwd()+'/routes/faces/'+str(size)+".jpeg");
    print(str(size)+".jpeg")

if __name__== "__main__":
    crop(sys.argv[1],sys.argv[2],sys.argv[3],sys.argv[4],sys.argv[5])
