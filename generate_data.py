import urllib.request
import urllib.parse
import json
import re

with open('raw_data.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()

governors = []

for line in lines:
    line = line.strip()
    if not line:
        continue
    parts = line.split('\t')
    if len(parts) >= 3:
        state = parts[0].strip()
        name_full = parts[1].strip()
        links_str = parts[2].strip()
        
        # Remove 'Gov. ' prefix
        name = name_full.replace('Gov. ', '')
        
        links = [l.strip() for l in links_str.split('|')]
        
        governors.append({
            'state': state,
            'name': name,
            'links': links
        })

print(f"Found {len(governors)} governors. Fetching images from Wikipedia...")

for gov in governors:
    # Query wikipedia for the person
    query = urllib.parse.quote(gov['name'])
    url = f"https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages|extracts&generator=search&gsrsearch={query}&gsrlimit=1&pithumbsize=400&exchars=200&exintro=1&explaintext=1"
    
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            pages = data.get('query', {}).get('pages', {})
            
            if pages:
                page_id = list(pages.keys())[0]
                page = pages[page_id]
                gov['image'] = page.get('thumbnail', {}).get('source', '')
                gov['summary'] = page.get('extract', '')
            else:
                gov['image'] = ''
                gov['summary'] = ''
        print(f"Fetched info for {gov['name']}")
    except Exception as e:
        print(f"Error fetching {gov['name']}: {e}")
        gov['image'] = ''
        gov['summary'] = ''

with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(governors, f, indent=4)

print("Saved to data.json")
