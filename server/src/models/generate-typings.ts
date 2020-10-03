import * as path from 'path'
import {GraphQLDefinitionsFactory} from '@nestjs/graphql'

const definitionsFactory = new GraphQLDefinitionsFactory()
definitionsFactory.generate({
  typePaths: [path.join(process.cwd(), 'src/models/models.graphql')],
  path: path.join(process.cwd(), 'src/models/graphql.schema.ts'),
  outputAs: 'class',
})
