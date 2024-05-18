<script setup>
import { ref } from 'vue'
import axios from "axios"

// UI Components
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Lucide Icons
import { 
    List, 
    Search,
    Plus
} from 'lucide-vue-next'

// Custom Components
import AddTask from '@/components/site/AddTask.vue'
import TaskCard from '@/components/site/TaskCard.vue'
import ThemeToggle from '@/components/site/ThemeToggle.vue'

const tasks = ref([]);
const fetchTasks = async () => {
    try {
        const response = await axios.get("http://localhost:3000/task");
        tasks.value = response.data.tasks;
        console.log(tasks.value);
    } catch (error) {
        console.error(error);
    }
}

fetchTasks();
</script>

<template>
    <div class="w-full flex flex-col items-center">
        <div class="sm:w-[500px] sm:px-0 w-full px-4 mt-12 flex flex-col gap-y-5">
            <div class="header mb-2">
                <div class="w-full flex justify-between">
                    <div>
                        <h1 class="font-black sm:text-2xl pb">Task Manager</h1>
                        <p class="dark:text-slate-400 text-gray-600 text-sm">Keep your tasks organized.</p>
                    </div>
                    <div class="tools-panel flex items-center gap-x-2 justify-end">
                        <AddTask @updateTaskList="fetchTasks" action="create">
                            <template #trigger>
                                <Button>
                                    <Plus class="w-4 h-4 mr-2" />
                                    Add Task
                                </Button>
                            </template>
                        </AddTask>
                        <ThemeToggle />
                    </div>
                </div>
            </div>

            <Tabs default-value="todo" class="w-full">
                <TabsList class="grid w-full grid-cols-2 mb-5">
                    <TabsTrigger value="todo">
                        To Do
                    </TabsTrigger>
                    <TabsTrigger value="done">
                        Done
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="todo">
                    <div class="flex flex-col gap-y-4 items-center" v-if="tasks.filter(t => !t.status === true).length > 0">
                        <TaskCard
                            v-for="task in tasks.filter(t => !t.status === true)"
                            :key="task.id"
                            :id="parseInt(task.id)"
                            :title="task.title"
                            :due="task.due ? new Date(task.due): null"
                            :status="task.status"
                            @updateTaskList="fetchTasks"
                        />
                    </div>
                    <div class="w-full h-[200px] flex items-center justify-center" v-if="tasks.filter(t => !t.status === true).length === 0">
                        <p class="dark:text-slate-400 text-gray-600">Yay! You have don't have any task </p>
                    </div>
                </TabsContent>
                <TabsContent value="done">
                    <div class="flex flex-col gap-y-4 items-center" v-if="tasks.filter(t => !t.status === false).length > 0">
                        <TaskCard
                            v-for="task in tasks.filter(t => !t.status === false)"
                            :key="task.id"
                            :id="parseInt(task.id)"
                            :title="task.title"
                            :due="task.due ? new Date(task.due): null"
                            :status="task.status"
                            @updateTaskList="fetchTasks"
                        />
                    </div>
                    <div class="w-full h-[200px] flex items-center justify-center" v-if="tasks.filter(t => !t.status === false).length === 0">
                        <p class="dark:text-slate-400 text-gray-600">You haven't finished any task yet.</p>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    </div>
</template>