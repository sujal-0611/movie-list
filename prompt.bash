#!/bin/bash
 
# Define the directories to search within as a list
declare -a directories=("app" "lib")  # Add or remove directories as needed
output_file="combined_output.txt"
 
# Check if the output file already exists and remove it to start fresh
if [ -f "$output_file" ]; then
    rm "$output_file"
fi
 
# Loop through each directory specified
for dir in "${directories[@]}"; do
    # Check if directory exists
    if [ -d "$dir" ]; then
        # Find all files in the directory and subdirectories
        find "$dir" -type f | while read file; do
            # Print the file path relative to the 'dir' directory prefixed by '##'
            echo "## $(echo $file | sed "s|$dir/||")" >> "$output_file"
            # Append the content of the file to the output file
            cat "$file" >> "$output_file"
            # Optionally add a newline for better readability between files
            echo "" >> "$output_file"
        done
    else
        echo "Directory $dir does not exist."
    fi
done
 
echo "All files have been combined into $output_file."
 