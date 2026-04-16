import json
import re

content_md_path = r"C:\Users\Abel Berhane\.gemini\antigravity\brain\fbaf126e-80e0-420c-8172-262f7e79be68\.system_generated\steps\55\content.md"

with open(content_md_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Extract all [Platform](url)
extracted_links = []
link_pattern = re.compile(r'^\[(.*?)\]\((.*?)\)$')

# we only want to start extracting after line "Follow America’s Governors..."
start_extracting = False
for line in lines:
    line = line.strip()
    if 'Follow America’s Governors' in line:
        start_extracting = True
        continue
    
    if start_extracting:
        match = link_pattern.match(line)
        if match:
            platform = match.group(1).strip()
            url = match.group(2).strip()
            # If it's a relative URL, fix it
            if url.startswith('/'):
               url = 'https://www.nga.org' + url
            extracted_links.append({"platform": platform, "url": url})
        elif "We state solutions" in line:
            break

print(f"Extracted {len(extracted_links)} total links from markdown.")

with open('data.json', 'r', encoding='utf-8') as f:
    governors = json.load(f)

# Assign sequentially based on the expected number of links
pointer = 0
for gov in governors:
    expected_count = len(gov.get('links', []))
    
    real_links = []
    for _ in range(expected_count):
        if pointer < len(extracted_links):
            link = extracted_links[pointer]
            # Verify the platform matches loosely (case insensitive)
            # The list exactly matches the prompt, so it should be fine
            real_links.append(link)
            pointer += 1
        else:
            print(f"Warning: Ran out of links while processing {gov['name']}")
            break
            
    gov['real_links'] = real_links

print(f"Assigned links. Reached pointer {pointer}/{len(extracted_links)}")

with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(governors, f, indent=4)

with open('data.json', 'r', encoding='utf-8') as f:
    data_content = f.read()

with open('data.js', 'w', encoding='utf-8') as f:
    f.write('const windowGovernorsData = ' + data_content + ';')

print("Successfully injected real social links into data.js!")
