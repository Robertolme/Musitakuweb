import yt_dlp as youtube_dl
from os import system
import sys
import os

#python3 -m pip install --force-reinstall https://github.com/yt-dlp/yt-dlp/archive/master.tar.gz
def sulist():
	datos = []
	with open("Descarga.txt") as fname:
		lineas = fname.readlines()
		for linea in lineas:
			datos.append(linea.strip('\n'))
	return datos


def descargar(link):
	try:
		with youtube_dl.YoutubeDL(ydl_op) as ydl:
			ydl.download("ytsearch:%s" % link)
	except:
		try:
			with youtube_dl.YoutubeDL(ydl_op) as ydl:
				ydl.download("ytsearch:%s" % link)
		except:
			listx.append(link)

ydl_op = {
    'outtmpl': 'audios/%(title)s.%(ext)s',
    'format': 'bestaudio/best',
    'postprocessors': [{
    'key': 'FFmpegExtractAudio',
    'preferredcodec':'mp3',
    'preferredquality':'192',
    }],
}

arg = sys.argv[1]

descargar(arg)


