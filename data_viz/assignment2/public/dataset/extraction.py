# -*- coding: utf-8 -*-
import numpy as np
import pandas as pd

# extract needed data for pie chart
def piedata(dataset):
	df = dataset[['Course Subject','Participants (Course Content Accessed)']]
	df.groupby(['Course Subject']).sum().to_csv('pie.csv')

# extract needed data for bar chart
def bardata(dataset):
	df = dataset[['Institution','Launch Date', 'Course Title']]
	df.loc[:, 'Launch Date'] = pd.to_datetime(df['Launch Date'])
	df.loc[:, 'Launch Date'] = [date.strftime('%Y-%m') for date in df['Launch Date']]
	pd.merge(counter(df, 'MITx'), counter(df, 'HarvardX'), how='outer', on='Launch Date').fillna(0).to_csv('bar.csv', index=False)

# count the number of courses provided by institutions
def counter(df, insti):
	result = df.groupby(['Institution']).get_group(insti).groupby(['Launch Date']).count()['Course Title']
	result = pd.DataFrame({'Launch Date': result.index, insti: result})
	result.index = list(range(len(result)))
	return result

def main():
	file = 'appendix.csv'
	dataset = pd.read_csv(file)
	piedata(dataset)
	bardata(dataset)

if __name__ == '__main__':
	main()